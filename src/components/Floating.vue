<template>
  <div
    class="floating"
    :style="computedStyle"
    @mousedown="onMouseDown"
  >
    <slot></slot>
  </div>
</template>

<script>
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
      this.dragged = true;
      this.offset = {
        x: e.clientX - this.$el.offsetLeft,
        y: e.clientY - this.$el.offsetTop
      }
    },
    onMouseMove(e) {
      if (this.dragged && document.fullscreenElement === null) {
        this.position = {
          left: `${e.clientX - this.offset.x}px`,
          top: `${e.clientY - this.offset.y}px`
        }
      }
    },
    onResize() {
      if (this.position) {
        this.position = {
          left: Math.round((parseInt(this.position.left) / this.oldWindowSize.w) * window.innerWidth) + 'px',
          top: Math.round((parseInt(this.position.top) / this.oldWindowSize.h) * window.innerHeight) + 'px'
        }
      }
      this.oldWindowSize = {
        w: window.innerWidth,
        h: window.innerHeight
      }
    }
  },
  created() {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('resize', this.onResize)
    this.onResize()
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
  }
</style>
