import Vue from 'vue'
import VideoPlayer from './VideoPlayer'

export const videoPlayer = {
  destroyed: true,
  paused: true,
  lock: Promise.resolve(),
  unlock: null,
  destroy() {
    this.destroyed = true
  }
};

export default {
  render(h) {
    return h('div')
  },
  mounted() {
    videoPlayer.lock.then(() => {
      if (!videoPlayer.instance) {
        videoPlayer.instance = new Vue(VideoPlayer)
        videoPlayer.instance.$mount()
        videoPlayer.destroyed = false
      }
      
    this.$el.appendChild(videoPlayer.instance.$el)
      videoPlayer.instance.paused = videoPlayer.instance.$refs.video.paused; //Resync chrome bug
      if (videoPlayer.paused !== videoPlayer.instance.paused)
        videoPlayer.instance.togglePlay()
      videoPlayer.lock = new Promise(r => videoPlayer.unlock = r)
    })
  },
  beforeDestroy() {
    videoPlayer.paused = videoPlayer.instance.paused;
    this.$el.removeChild(videoPlayer.instance.$el)
    if (videoPlayer.destroyed) {
      videoPlayer.instance.$destroy()
      videoPlayer.instance = null;
      videoPlayer.paused = true;
    }
    videoPlayer.unlock();
  }
}