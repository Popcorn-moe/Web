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
      if (this.dragged) {
        this.position = {
          left: `${e.clientX - this.offset.x}px`,
          top: `${e.clientY - this.offset.y}px`
        }
      }
    }
  },
  created() {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
  },
  destroyed() {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)
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
