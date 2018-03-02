<template>
  <div class="video-player"
    @mousemove="onMouseMove"
    :style="{ 'cursor': controlsHidden ? 'none' : null }"
  >
    <video ref="video"
      @pause="paused = true"
      @play="paused = false"
      @timeupdate="onTimelineChangeEvent"
      @waiting="waiting = true"
      @canplay="waiting = false"
      @progress="onProgress"
      @click="togglePlay"
    >
      <!--source src="//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.mp4" type="video/mp4"!-->
      Your browser does not support HTML5 video.
    </video>
    <v-progress-circular dark indeterminate class="main-color--text video-waiting" v-show="waiting"></v-progress-circular>
    <v-icon dark @click="togglePlay" v-if="!hasPlayed || paused" class="video-play">play_arrow</v-icon>
    <!-- Video Controls -->
    <v-fade-transition>
      <div class="video-controls" v-show="hasPlayed && !controlsHidden">
        <player-slider dark hide-details color="primary" class="floating-cancel timeline" :step="0" :buffer="buffered" :value="timeline" @input="changeTimeline"></player-slider>
        <v-btn color="primary" dark icon @click.stop="togglePlay"><v-icon v-html="paused ? 'play_arrow' : 'pause'"></v-icon></v-btn>
        <v-btn color="primary" dark icon @click.stop="toggleMute"><v-icon v-html="muted ? 'volume_off' : 'volume_up'"></v-icon></v-btn>
        <v-slider hide-details color="primary" dark class="floating-cancel volume" :max="100" :value="muted ? 0 : volume" @input="changeVolume"></v-slider>
        <div class="timer">{{ currentTime }}/{{ duration }}</div>
        <v-btn color="primary" dark icon class="right" @click.stop="toggleFullScreen"><v-icon v-html="fullscreen ? 'fullscreen_exit' : 'fullscreen'"></v-icon></v-btn>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import {
	VBtn,
	VIcon,
	VSlider,
	VProgressCircular
} from "vuetify/es5/components";
import { VFadeTransition } from "vuetify/es5/components/transitions";
import PlayerSlider from "./PlayerSlider.vue";
import "fullscreen-api-polyfill";
import MegaMediaSource from "../../mse/MegaMediaSource";

export default {
	name: "video-player",
	props: ["value"],
	data() {
		return {
			hasPlayed: false,
			waiting: false,
			paused: true,
			muted: false,
			fullscreen: false,
			buffered: [],
			timeline: 0,
			volume: 100,
			currentTime: 0,
			duration: 0,
			controlsHidden: true
		};
	},
	created() {
		document.addEventListener("fullscreenchange", this.onFullscreenEvent);
		document.addEventListener("fullscreenerror", this.onFullscreenEvent);
	},
	beforeDestroy() {
		this.mse && this.mse.destroy();
		document.removeEventListener("fullscreenchange", this.onFullscreenEvent);
		document.removeEventListener("fullscreenerror", this.onFullscreenEvent);
	},
	methods: {
		formatTime(time) {
			let minutes = Math.floor(time / 60);
			minutes = minutes >= 10 ? minutes : "0" + minutes;
			let seconds = Math.floor(time % 60);
			seconds = seconds >= 10 ? seconds : "0" + seconds;
			return `${minutes}:${seconds}`;
		},
		togglePlay() {
			const video = this.$refs.video;
			if (!this.hasPlayed) {
				const host = this.value.split("/")[2];
				if (host.startsWith("mega"))
					this.mse = new MegaMediaSource(this.value, this.$refs.video);
				else video.src = this.value;
			}
			this.hasPlayed = true;
			this.showControls();
			this.paused ? video.play().catch(() => {}) : video.pause();
		},
		toggleMute() {
			this.muted = this.$refs.video.muted = !this.muted;
		},
		toggleFullScreen() {
			this.fullscreen
				? document.exitFullscreen()
				: this.$el.requestFullscreen();
		},
		onFullscreenEvent() {
			this.fullscreen = document.fullscreenElement !== null;
		},
		onTimelineChangeEvent() {
			const video = this.$refs.video;
			if (video) this.timeline = 100 / video.duration * video.currentTime;
			this.currentTime = this.formatTime(video.currentTime);
			this.duration = this.formatTime(video.duration);
		},
		onProgress() {
			const video = this.$refs.video;
			if (video) {
				const buffered = [];
				for (let i = 0; i < video.buffered.length; i++) {
					buffered.push([
						video.buffered.start(i) / video.duration * 100,
						video.buffered.end(i) / video.duration * 100
					]);
				}
				this.buffered = buffered;
			}
		},
		changeTimeline(value) {
			const video = this.$refs.video;
			if (video)
				video.currentTime = video.duration * ((this.timeline = value) / 100);
		},
		changeVolume(value) {
			if (this.$refs.video)
				this.$refs.video.volume = (this.volume = value) / 100;
		},
		onMouseMove(e) {
			if (Math.abs(e.movementX) > 1 || Math.abs(e.movementY) > 1)
				this.showControls();
		},
		showControls() {
			this.controlsHidden = false;
			if (this.timeoutID) clearTimeout(this.timeoutID);
			this.timeoutID = setTimeout(() => (this.controlsHidden = true), 3000);
		}
	},
	components: {
		VBtn,
		VIcon,
		VSlider,
		PlayerSlider,
		VProgressCircular,
		VFadeTransition
	}
};
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .video-player
  {
    background-color: black;
    line-height: 0px;
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;

    &:fullscreen {
      width: 100vw;
    }

    video {
      height: 100%;
      width: 100%;
    }

    .video-waiting {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 10% !important;
      width: 10% !important;
      transform: translate(-50%, -50%);
    }

    .video-play {
			cursor: pointer;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 100px;
      width: 100px;
      font-size: 100px;
    }

    .video-controls {
      text-align: left;
      position: absolute;
      width: 100%;
      bottom: 0;

      .timeline {
        padding: 10px !important;
        margin-bottom: 10px;
        height: 10px;
      }

      .volume {
        vertical-align: middle;
        display: inline-block;
        width: 100px;
        padding: 0;
      }

      .slider__track-fill {
        background: $main-color !important;
      }

      .slider__thumb {
        background: $main-color !important;
      }

      .timer {
        margin-left 15px
        vertical-align: middle;
        display: inline-block;
        width: 100px;
        padding: 0;
        color: white !important
      }
    }
  }
</style>
