import Vue from 'vue'
import { Vuetify } from 'vuetify/src/components'
import VideoPlayer from './VideoPlayer'

Vue.use(Vuetify)

export const videoPlayer = new Vue(VideoPlayer);

export function mount() {
  videoPlayer.$mount() //Create dom element  
}

let paused = true;
let lock = Promise.resolve()
let unlock = null;

export default {
  render(h) {
    return h('div')
  },
  mounted() {
    lock.then(() => {
      this.$el.appendChild(videoPlayer.$el)
      videoPlayer.paused = videoPlayer.$refs.video.paused; //Resync chrome bug
      if (paused !== videoPlayer.paused)
        videoPlayer.togglePlay();
      lock = new Promise(r => unlock = r)
    })
  },
  beforeDestroy() {
    paused = videoPlayer.paused;
    this.$el.removeChild(videoPlayer.$el)
    unlock();
  }
}