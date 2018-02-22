<script>
import VSlider from "vuetify/es5/components/VSlider/VSlider";

export default {
	name: "player-slider",
	mixins: [VSlider],
	props: {
		buffer: Array
	},
	computed: {
		inputValue: {
			get() {
				return this.value;
			},
			set(value) {
				if (value !== this.value) {
					this.$emit("input", value);
				}
			}
		}
	},
	methods: {
		genBuffers(h) {
			const ticks = this.buffer.map(([start, end]) => {
				const span = h("span", {
					class: "slider__buffer",
					style: {
						left: `${start}%`,
						width: `${end - start}%`
					}
				});

				return span;
			});

			return h(
				"div",
				{
					class: "slider__buffer-container"
				},
				ticks
			);
		}
	},
	render(h) {
		return VSlider.render.call(this, (tag, attrs, children) => {
			if (attrs.staticClass === "slider") {
				if (this.buffer) children.splice(0, 0, this.genBuffers(h));
			}
			return h(tag, attrs, children);
		});
	}
};
</script>


<style lang="stylus">
@import '../../stylus/main.styl';

.slider__buffer-container {
  transform: translate3d(0, -50%, 0);
  position: absolute;
  left: 0;
  height: 2px;
  width: 100%;
  top: 50%;
  overflow: hidden;

  .slider__buffer {
    display: inline-block;
    vertical-align: middle;
    background-color: $secondary-color;
    height: 2px;
    position: absolute;
  }
}
</style>
