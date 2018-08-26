import Vue from "vue";
import VideoPlayer from "./VideoPlayer.vue";

const VIDEO_PROPS = Array.isArray(VideoPlayer.props)
	? VideoPlayer.props
	: Object.keys(VideoPlayer.props);

export const videoPlayer = {
	owner: null,
	media: null,
	destroyed: true,
	paused: true,
	destroy() {
		this.destroyed = true;
	}
};

export default {
	props: ["owner", "media"].concat(VIDEO_PROPS),
	render(h) {
		return h("div");
	},
	mounted() {
		if (videoPlayer.owner != null)
			throw new Error(`Already owned by ${videoPlayer.owner}`);

		if (
			this.value &&
			videoPlayer.instance &&
			this.value != videoPlayer.instance.value
		) {
			if (!videoPlayer.destroyed) videoPlayer.destroy();
			videoPlayer.instance.$destroy();
			videoPlayer.instance = null;
			videoPlayer.paused = true;
		}

		if (!videoPlayer.instance) {
			videoPlayer.instance = new Vue(VideoPlayer);
			VIDEO_PROPS.forEach(prop => (videoPlayer.instance[prop] = this[prop]));
			videoPlayer.instance.$mount();
			videoPlayer.destroyed = false;
			videoPlayer.media = this.media;
		}

		this.$el.appendChild(videoPlayer.instance.$el);
		videoPlayer.instance.paused = videoPlayer.instance.$refs.video.paused; //Resync chrome bug
		if (videoPlayer.paused !== videoPlayer.instance.paused)
			videoPlayer.instance.togglePlay();
		videoPlayer.owner = this.owner;
	},
	beforeDestroy() {
		videoPlayer.paused = videoPlayer.instance.paused;
		this.$el.removeChild(videoPlayer.instance.$el);

		if (videoPlayer.destroyed || !videoPlayer.instance.hasPlayed) {
			if (!videoPlayer.destroyed) videoPlayer.destroy();
			videoPlayer.instance.$destroy();
			videoPlayer.instance = null;
			videoPlayer.paused = true;
		}
		videoPlayer.owner = null;
	}
};
