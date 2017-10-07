import { File } from 'megajs/dist/main.browser-es.js'


var _appendBuffer = function(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
};

export default class MegaMediaSource {
  constructor (url, video) {
    this.mediaSource = new MediaSource()
    this.video = video
    this.video.addEventListener('error', () => console.error(this.video.error))
    this.video.src = URL.createObjectURL(this.mediaSource)
    this.mediaSource.addEventListener('sourceopen', () => this.sourceOpen())
    //this.video.addEventListener('timeupdate', (e) => this.timeUpdate(e))
    this.file = File.fromURL(url)
  }

  sourceOpen() {
    this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4D401F, mp4a.40.2"')
    File.fromURL('https://mega.nz/#!gpliRICA!b2Bbk3MBLSmFtdqPgMFpCdGvoj61pAmhBRsYlMdz1KI').download((err, data) => {
      this.positions = data.toString()
          .split('\n')
          .map(e => e.split('|').map(parseFloat))
          .filter(([key]) => !isNaN(key))
          .sort((a,b) => a[0] - b[0])
      console.log(this.positions)
      this.currentBuffer = 0
      this.download(0, this.positions[this.currentBuffer + 1][1])
    })
  }

  /*timeUpdate(e) {
    const time = Math.round(this.video.currentTime)
    const buffer = this.positions.findIndex((e, i, arr) => e[0] <= time && arr[i + 1][0] > time)
    console.log(e, time, buffer)
    if (buffer != this.currentBuffer) {
      this.currentBuffer = buffer;
      this.download(this.positions[this.currentBuffer][1], this.positions[this.currentBuffer + 1][1])
    }
  }*/

  /*download(start, end) {
    this.file.download({ start, end }, (err, data) => {
      console.log('Downloaded', start, end)
      if (err) console.log(err)
      else this.sourceBuffer.appendBuffer(data)
    })
  }*/

  download() {
    const queue = []
    const stream = this.file.download()
    stream.on('data', data => {
      if (queue.length || this.sourceBuffer.updating)
        queue.push(data)
      else
        this.sourceBuffer.appendBuffer(data)
    })
    stream.on('end', () => this.mediaSource.endOfStream())
    this.sourceBuffer.addEventListener('updateend', () => {
      if (queue.length && !this.sourceBuffer.updating)
        this.sourceBuffer.appendBuffer(queue.shift())
    })
  }
}