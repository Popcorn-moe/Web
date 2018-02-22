import { File } from "megajs/dist/main.browser-es.js";
import ebml from "ebml";

// From https://www.webmproject.org/docs/container/
const INIT_EBML_ARRAYS = ["SeekHead", "Tracks", "Cues"];
const ROOT = Symbol("root");

function appendBuffer(buffer1, buffer2) {
	const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp;
}

function byteArrayToLong(byteArray) {
	let value = 0;
	for (let i = 0; i < byteArray.length; i++) {
		value = value * 256 + byteArray[i];
	}
	return value;
}

export default class MegaMediaSource {
	constructor(url, video) {
		this.mediaSource = new MediaSource();
		this.video = video;
		this.video.addEventListener("error", () => console.error(this.video.error));
		this.video.src = URL.createObjectURL(this.mediaSource);
		this.mediaSource.addEventListener("sourceopen", () => this.sourceOpen());
		this.video.addEventListener("loadedmetadata", () => this.loadedMetadata());
		this.video.addEventListener("seeking", e => this.seeking(e));
		this.buffers = [];
		this.seekQueue = Promise.resolve();
		this.lastSeek = 0;
		this.file = File.fromURL(url);
	}

	sourceOpen() {
		this.readInitSegment().then(([data, segment]) => {
			console.log(data, segment.byteLength);
			for (const seek of data.Segment.SeekHead) {
				if (seek.SeekID && byteArrayToLong(seek.SeekID.data) == 0x1c53bb6b)
					console.log("Cue Offset", seek);
			}
			this.cues = MegaMediaSource.getCues(data);
			console.log(this.cues);
			this.sourceBuffer = this.mediaSource.addSourceBuffer(
				MegaMediaSource.getCodec(data)
			);
			this.sourceBuffer.addEventListener("updateend", _ => this.updateEnd());
			this.sourceBuffer.addEventListener("error", e => console.error(e));
			this.appendBuffer(segment);
			this.lastByte = segment.byteLength;
		});
	}

	loadedMetadata() {
		this.startDownload(this.lastByte);
	}

	seeking(e) {
		this.seekQueue = this.seekQueue.then(
			_ =>
				new Promise(resolve => {
					console.log("Seeking");
					let time = this.video.currentTime;
					if (this.lastSeek == time) return resolve();
					this.lastSeek = time;

					const buffered = this.sourceBuffer.buffered;
					for (let i = 0; i < buffered.length; i++)
						if (time >= buffered.start(i) && time <= buffered.end(i)) {
							time = buffered.end(i);
							break;
						}

					this.stopDownload();
					const next = this.cues.find(e => e.offset >= this.lastByte);

					const seek = () => {
						console.log("Seek");
						const next = this.cues
							.slice(0)
							.reverse()
							.find(e => e.time / 1000 <= time);
						this.startDownload(next.offset + 1);
						resolve();
					};
					if (next && next.offset == this.lastByte) seek();
					else {
						const stream = this.file.download({
							start: this.lastByte,
							end: next ? next.offset : undefined
						});
						stream.on("data", data => this.appendBuffer(data));
						stream.once("end", seek);
						console.log(
							"Next",
							next,
							this.lastByte,
							this.video.currentTime,
							this.mediaSource.duration,
							this.video.duration,
							e
						);
					}
				})
		);
	}

	startDownload(start) {
		if (this.currentStream) throw new Error("Download alrealy running");
		this.lastByte = start;
		this.currentStream = this.file.download({ start, maxConnections: 2 });

		this.currentStream.on("data", buffer => {
			if (this.currentStream) {
				this.appendBuffer(buffer);
				this.lastByte += buffer.byteLength;
			}
		});
		this.currentStream.on("end", _ => console.log("Download end"));
	}

	stopDownload() {
		this.currentStream.emit("close");
		this.currentStream = null;
	}

	appendBuffer(buffer) {
		if (this.buffers.length > 0 || this.sourceBuffer.updating)
			this.buffers.push(buffer);
		else this.sourceBuffer.appendBuffer(buffer);
	}

	updateEnd() {
		console.log("Update End");
		const buffered = this.sourceBuffer.buffered;
		for (let i = 0; i < buffered.length; i++)
			console.log("\t => Buffered", i, buffered.start(i), buffered.end(i));
		if (this.buffers.length && !this.sourceBuffer.updating)
			this.sourceBuffer.appendBuffer(this.buffers.shift());
	}

	readInitSegment() {
		return new Promise((resolve, reject) => {
			const stream = this.file.download({
				maxChunkSize: 128 * 1024,
				maxConnections: 2
			});
			const decoder = new ebml.Decoder();

			let node = {};
			let buffer = new Uint8Array();

			stream.on("data", data => (buffer = appendBuffer(buffer, data)));

			decoder.on("data", ([type, data]) => {
				switch (type) {
					case "start":
						if (data.name == "Cluster") {
							resolve([node[ROOT], buffer.slice(0, data.start)]);
							stream.emit("close");
							break;
						}

						if (Array.isArray(node)) {
							const tmp = INIT_EBML_ARRAYS.includes(data.name) ? [] : {};
							tmp[ROOT] = node;
							node.push(tmp);
							node = tmp;
						} else {
							if (!node[data.name]) {
								node[data.name] = INIT_EBML_ARRAYS.includes(data.name)
									? []
									: {};
								node[data.name][ROOT] = node;
							}
							node = node[data.name];
						}
						node.dataOffset = data.end - data.dataSize;
						break;
					case "tag":
						if (Array.isArray(node)) node.push(data);
						else node[data.name] = data;
						break;
					case "end":
						node = node[ROOT];
						break;
				}
			});
			decoder.on("error", reject);

			stream.pipe(decoder);
		});
	}

	static getCodec({ Segment: { Tracks } }) {
		let vCodec;
		let aCodec;
		for (const track of Tracks) {
			if (track.CodecID) {
				const codec = track.CodecID.data.toString().toLowerCase();
				if (codec.startsWith("v_")) vCodec = codec.slice(2);
				else if (codec.startsWith("a_")) aCodec = codec.slice(2);
			}
		}
		if (vCodec && aCodec) return `video/webm;codecs="${vCodec},${aCodec}"`;
		else if (vCodec) return `video/webm;codecs="${vCodec}"`;
		else if (aCodec) return `audio/webm;codecs="${aCodec}"`;
	}

	static getCues({ Segment: { dataOffset, Cues, Info: { TimecodeScale } } }) {
		if (Cues === undefined) return;
		const timeBase = TimecodeScale
			? byteArrayToLong(TimecodeScale.data) / 1000000
			: 1;
		const cues = [];
		for (const cue of Cues) {
			if (cue.CueTime)
				cues.push({
					time: byteArrayToLong(cue["CueTime"].data) * timeBase,
					offset:
						byteArrayToLong(
							cue["CueTrackPositions"]["CueClusterPosition"].data
						) + dataOffset
				});
		}
		return cues;
	}
}
