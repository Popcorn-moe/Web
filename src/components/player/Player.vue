<template>
  <div class="video-player">
    <video ref="video" @pause="paused = true" @play="paused = false">
      <source src="//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <!-- Video Controls -->
    <div class="video-controls">
      <v-btn primary dark icon @click.stop="togglePlay()"><v-icon v-html="paused ? 'play_arrow' : 'pause'"></v-icon></v-btn>
      <v-btn primary dark icon @click.stop="toggleMute()"><v-icon v-html="muted ? 'volume_off' : 'volume_up'"></v-icon></v-btn>
      <v-btn primary dark icon @click.stop="toggleFullScreen()"><v-icon v-html="fullScreen ? 'fullscreen_exit' : 'fullscreen'"></v-icon></v-btn>
    </div>
  </div>
</template>

<script>
  import { VBtn, VIcon } from 'vuetify/src/components';

  export default {
    name: 'video-player',
    data () {
      return {
          paused: true,
          muted: false,
          fullScreen: false
      }
    },
    methods: {
      togglePlay()
      {
        const video = this.$refs.video;
        this.paused ? video.play() : video.pause();
      },
      toggleMute()
      {
        const video = this.$refs.video;
        this.muted = video.muted = !this.muted
      },
      toggleFullScreen()
      {
        const video = this.$refs.video;
        const elem = this.$el;

        this.fullScreen = !this.fullScreen;


        this.fullScreen ? elem.requestFullscreen() : document.exitFullscreen()
      }
    },
    components:
    {
      VBtn,
      VIcon
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .video-player
  {
    &:fullscreen video {
      width: 100vw;
    }
    position: relative;
    display: inline-block;

    video {
      height: 100%;
      width: 100%;
    }

    .video-controls {
      text-align: left;
      position: absolute;
      width: 100%;
      bottom: 0;
      /*background-color: alpha($main-color, 0.5);*/
    }
  }
</style>
