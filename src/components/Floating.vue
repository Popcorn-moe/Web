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
        if (e.path.find(e => e.classList && e.classList.contains('floating-cancel')))
          return;
        let x = e.clientX - this.offset.x;
        let y = e.clientY - this.offset.y;
        const limitX = window.innerWidth - this.$el.offsetWidth;
        const limitY = window.innerHeight - this.$el.offsetHeight;
        if (x > limitX) x = limitX;
        if (x < 0) x = 0;
        if (y > limitY) y = limitY;
        if (y < 0) y = 0;
        this.position = {
          left: x + 'px',
          top: y + 'px'
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
