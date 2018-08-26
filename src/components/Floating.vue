<template>
  <div
    class="floating elevation-4"
    :style="computedStyle"
    @mousedown="onMouseDown"
		@touchstart="({ target, touches: [{ clientX, clientY }]}) => onMouseDown({ target, clientX, clientY })"
  >
    <v-btn icon small class="close-button main-color--text" @click.stop="$emit('close')">
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn icon small class="return-button main-color--text" @click.stop="$emit('return')">
      <v-icon>keyboard_tab</v-icon>
    </v-btn>
    <slot></slot>
  </div>
</template>

<script>
import { VBtn, VIcon } from "vuetify";

export default {
	data() {
		return {
			position: null,
			dragged: false,
			moved: false
		};
	},
	props: {
		initial: Object
	},
	computed: {
		computedStyle() {
			return this.position || this.initial;
		}
	},
	methods: {
		onMouseUp(e) {
			if (this.dragged && this.moved) e.stopPropagation();
			this.dragged = false;
		},
		onMouseDown({ target, clientX, clientY }) {
			let el = target;
			while (el && el != this.$el) {
				if (el.classList && el.classList.contains("floating-cancel")) return;
				el = el.parentElement;
			}
			this.dragged = true;
			this.moved = false;
			this.offset = {
				x: clientX - this.$el.offsetLeft,
				y: clientY - this.$el.offsetTop
			};
		},
		setPosition(x, y) {
			const limitX = document.body.clientWidth - this.$el.offsetWidth;
			const limitY = document.body.clientHeight - this.$el.offsetHeight;
			if (x > limitX) x = limitX;
			if (x < 0) x = 0;
			if (y > limitY) y = limitY;
			if (y < 0) y = 0;
			this.position = {
				left: x + "px",
				top: y + "px"
			};
		},
		onMouseMove({ clientX, clientY }) {
			if (this.dragged && document.fullscreenElement === null) {
				this.setPosition(
					Math.round(clientX - this.offset.x),
					Math.round(clientY - this.offset.y)
				);
				this.moved = true;
			}
		},
		onTouchMove({ changedTouches: [touch] }) {
			this.onMouseMove(touch);
		},
		onResize() {
			if (this.position)
				this.setPosition(
					Math.round(this.position.left),
					Math.round(this.position.top)
				);
		}
	},
	components: {
		VBtn,
		VIcon
	},
	created() {
		document.addEventListener("click", this.onMouseUp, true); //Use click to cancel it
		document.addEventListener("mousemove", this.onMouseMove);
		document.addEventListener("touchmove", this.onTouchMove);
		document.addEventListener("touchend", this.onMouseUp);
		window.addEventListener("resize", this.onResize);
	},
	destroyed() {
		document.removeEventListener("click", this.onMouseUp, true);
		document.removeEventListener("mousemove", this.onMouseMove);
		document.removeEventListener("touchmove", this.onTouchMove);
		document.removeEventListener("touchend", this.onMouseUp);
		window.removeEventListener("resize", this.onResize);
	}
};
</script>


<style lang="stylus">
  @import '../stylus/main'

  .floating {
    line-height: 0;
    position: fixed;
    z-index: 100;
    cursor: move;
		width: 480px;

		@media only screen and (max-width: 768px) {
			width: 45%;
		}

    & *:fullscreen {
      cursor: auto;
    }

    .close-button {
      position: absolute;
      z-index: 100;
      right: 0;
    }

    .return-button {
      position: absolute;
      z-index: 100;
      left: 0;
    }
  }
</style>
