import Vue from "vue";
import VideoPlayer from "./VideoPlayer";

export const videoPlayer = {
	owner: null,
	destroyed: true,
	paused: true,
	destroy() {
		this.destroyed = true;
	}
};

export default {
	props: ["owner", "value"],
	render(h) {
		return h("div");
	},
	mounted() {
		if (videoPlayer.owner != null)
			throw new Error(`Already owned by ${videoPlayer.owner}`);

		if (!videoPlayer.instance) {
			videoPlayer.instance = new Vue(VideoPlayer);
			videoPlayer.instance.value = this.value;
			videoPlayer.instance.$mount();
			videoPlayer.destroyed = false;
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
