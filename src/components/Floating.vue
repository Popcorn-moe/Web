<template>
  <div
    class="floating elevation-4"
    :style="computedStyle"
    @mousedown="onMouseDown"
  >
    <v-btn icon small class="close-button main-color--text" @click.stop="$emit('close')">
      <v-icon>close</v-icon>
    </v-btn>
    <slot></slot>
  </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify/src/components'
export default {
  data() {
    return {
      position: null,
      dragged: false
    }
  },
  props: {
    width: String,
    initial: Object
  },
  computed: {
    computedStyle() {
      if (this.position) {
        return {
          width: this.width,
          ...this.position
        }
      } else {
        return {
          width: this.width,
          ...this.initial
        }
      }
    }
  },
  methods: {
    onMouseUp(e) {
      this.dragged = false;
    },
    onMouseDown(e) {
      let el = e.target
      while (el && el != this.$el) {
        if (el.classList && el.classList.contains('floating-cancel'))
          return
        el = el.parentElement
      }
      this.dragged = true;
      this.offset = {
        x: e.clientX - this.$el.offsetLeft,
        y: e.clientY - this.$el.offsetTop
      }
    },
    setPosition(x, y) {
      const limitX = document.body.clientWidth - this.$el.offsetWidth;
      const limitY = document.body.clientHeight - this.$el.offsetHeight;
      if (x > limitX) x = limitX;
      if (x < 0) x = 0;
      if (y > limitY) y = limitY;
      if (y < 0) y = 0;
      this.position = {
        left: x + 'px',
        top: y + 'px'
      }
    },
    onMouseMove(e) {
      if (this.dragged && document.fullscreenElement === null) 
        this.setPosition(e.clientX - this.offset.x,  e.clientY - this.offset.y)
    },
    onResize() {
      if (this.position)
        this.setPosition(parseInt(this.position.left), parseInt(this.position.top))
    }
  },
  components: {
    VBtn,
    VIcon
  },
  created() {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('resize', this.onResize)
  }
}
</script>


<style lang="stylus">
  @import '../stylus/main'

  .floating {
    line-height: 0;
    position: fixed;
    z-index: 100;
    cursor: move;

    & *:fullscreen {
      cursor: auto;
    }

    .close-button {
      position: absolute;
      z-index: 100;
      right: 0;
    }
  }
</style>
