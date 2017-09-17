<template>
  <div class="video-player">
    <video ref="video" @pause="paused = true" @play="paused = false" @timeupdate="onTimelineChangeEvent" @waiting="waiting = true" @playing="waiting = false">
      <source src="//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <v-progress-circular indeterminate class="main-color--text video-waiting" v-show="waiting"></v-progress-circular>
    <!-- Video Controls -->
    <div class="video-controls">
      <v-slider hide-details primary class="timeline" :value="timeline" @input="value => changeTimeline(value)"></v-slider>
      <v-btn primary dark icon @click.stop="togglePlay()"><v-icon v-html="paused ? 'play_arrow' : 'pause'"></v-icon></v-btn>
      <v-btn primary dark icon @click.stop="toggleMute()"><v-icon v-html="muted ? 'volume_off' : 'volume_up'"></v-icon></v-btn>
      <v-slider hide-details primary class="volume" :max="100" :value="volume" @input="value => changeVolume(value)"></v-slider>
      <v-btn primary dark icon class="right" @click.stop="toggleFullScreen()"><v-icon v-html="fullscreen ? 'fullscreen_exit' : 'fullscreen'"></v-icon></v-btn>
    </div>
  </div>
</template>

<script>
  import { VBtn, VIcon, VSlider, VProgressCircular } from 'vuetify/src/components';

  export default {
    name: 'video-player',
    data () {
      return {
        waiting: false,
        paused: true,
        muted: false,
        fullscreen: false,
        timeline: 0,
        volume: 100
      }
    },
    created() {
      document.addEventListener('fullscreenchange', this.onFullscreenEvent)
      document.addEventListener('fullscreenerror', this.onFullscreenEvent)
    },
    beforeDestroy() {
	    document.removeEventListener('fullscreenchange', this.onFullscreenEvent)
      document.removeEventListener('fullscreenerror', this.onFullscreenEvent)
    },
    methods: {
      togglePlay() {
        const video = this.$refs.video;
        this.paused ? video.play().catch(() => {}) : video.pause();
      },
      toggleMute() {
        this.muted = this.$refs.video.muted = !this.muted
      },
      toggleFullScreen() {
        this.fullscreen ? document.exitFullscreen() : this.$el.requestFullscreen()
      },
      onFullscreenEvent() {
        this.fullscreen = document.fullscreenElement !== null;
      },
      onTimelineChangeEvent() {
        const video = this.$refs.video;
        this.timeline = +((100 / video.duration) * video.currentTime).toFixed(0);
      },
      changeTimeline(value)
      {
        const video = this.$refs.video;
        video.currentTime = video.duration * ((this.timeline = value) / 100);
      },
      changeVolume(value)
      {
        this.$refs.video.volume = (this.volume = value) / 100;
      }
    },
    components:
    {
      VBtn,
      VIcon,
      VSlider,
      VProgressCircular
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .video-player
  {
    background-color: black;
    line-height: 0px;
    position: relative;
    display: inline-block;

    &:fullscreen video {
      width: 100vw;
    }

    video {
      height: 100%;
      width: 100%;
    }

    .video-waiting {
      position:absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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

    }
  }
</style>
