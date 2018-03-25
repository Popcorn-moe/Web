<template>
  <div class="cover-list" v-touch="{ right: prev, left: next }">
        <div
            :class="{ animate, covers: true }"
            :style="{ right: animeSize * elemsPerLine * moveDirection + 'px'}"
        >
            <div
                class="cover-el"
                v-for="(cover, i) in value"
                :style="{ left: animeSize * positions[i] + 'px'}"
                :key="cover.id"
                >
                    <cover :value="cover"/>
                </div>
        </div>
        <div class="shadow"></div>
        <v-btn class="nav-button nav-left main-color--text" fab @click="prev" v-if="$vuetify.breakpoint.mdAndUp && needArrow">
            <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn class="nav-button nav-right main-color--text" fab @click="next" v-if="$vuetify.breakpoint.mdAndUp && needArrow">
            <v-icon large>keyboard_arrow_right</v-icon>
        </v-btn>
        <slot/>
    </div>
</template>

<script>
import { VBtn, VIcon } from "vuetify/es5/components";
import { Touch } from "vuetify/es5/directives";
import { mapGetters } from "vuex";
import Cover from "./Cover";
import { setTimeout } from "timers";

// TODO: learn more of cubic-bezier to find right values
const ANIMATION_TIME_PREV = 500 * 3 / 5; // For timing function
const ANIMATION_TIME_NEXT = 500 * 3.5 / 5; // For timing function
const ANIME_SIZE = 180; // Anime width + 2 * padding
const PADDING = 10;

export default {
	props: {
		value: Array,
		type: String
	},
	data() {
		return {
			positions: this.value.map((e, i) => i),
			animeSize: ANIME_SIZE,
			elemsPerLine: 0,
			moveDirection: 0,
			animate: true
		};
	},
	mounted() {
		window.addEventListener("resize", this.update);
		this.update();
	},
	destroyed() {
		window.removeEventListener("resize", this.update);
	},
	computed: {
		...mapGetters({
			drawer: "drawer"
		}),
		needArrow() {
			return this.value.length > this.elemsPerLine;
		}
	},
	methods: {
		update() {
			const width =
				document.body.offsetWidth -
				(this.$vuetify.breakpoint.mdAndUp && this.drawer ? 280 : 0) -
				2 * PADDING;
			this.elemsPerLine = Math.floor(width / this.animeSize);
		},
		nextAnimationTick(fn) {
			this.$nextTick(() =>
				requestAnimationFrame(() => requestAnimationFrame(fn))
			);
		},
		prev() {
			if (this.value.length <= this.elemsPerLine) return;
			this.animate = false;
			this.moveDirection = 1;
			this.positions = this.positions.map(v => v + this.elemsPerLine);
			this.nextAnimationTick(() => {
				this.animate = true;
				this.moveDirection = 0;
				this.positions.forEach((v, i, arr) => {
					if (v >= this.positions.length) {
						const nV = v % this.positions.length;
						setTimeout(
							_ => this.$set(arr, i, nV),
							ANIMATION_TIME_PREV * (1 - nV / this.elemsPerLine)
						);
					}
				});
			});
		},
		next() {
			if (this.value.length <= this.elemsPerLine) return;
			this.animate = false;
			this.moveDirection = -1;
			this.positions = this.positions.map(v => v - this.elemsPerLine);
			this.nextAnimationTick(() => {
				this.animate = true;
				this.moveDirection = 0;
				this.positions.forEach((v, i, arr) => {
					if (v < 0) {
						const nV = (v + this.positions.length) % this.positions.length;
						setTimeout(
							_ => this.$set(arr, i, nV),
							ANIMATION_TIME_NEXT * (1 - (-v - 1) / this.elemsPerLine)
						);
					}
				});
			});
		}
	},
	watch: {
		drawer() {
			this.update();
		},
		value(val) {
			if (val) this.positions = val.map((e, i) => i);
		}
	},
	components: {
		VBtn,
		VIcon,
		Cover
	},
	directives: {
		Touch
	}
};
</script>


<style lang="stylus">
  @import '../../stylus/main'

  .cover-list {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    padding: 10px;

    .covers {
        height: $anime-height;
        position: relative;

        &.animate {
            transition: right 500ms;
        }

        & > .cover-el {
            position: absolute;
        }
    }

    .nav-button {
        position: absolute;
        top: $anime.img-height * 0.5 - $anime.img-border;
        transform: translateX(-50%);
        z-index: 2;

        &.nav-left {
            left: 28px;
        }

        &.nav-right {
            right: -28px;
        }
    }

    .shadow {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        pointer-events: none;
    }
  }

  .application.theme--dark .cover-list {
    .shadow {
        background: linear-gradient(to right, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 7px, $material-dark.background 100%);
    }
  }

  .application.theme--light .cover-list {
    .shadow {
        background: linear-gradient(to right, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 7px, $material-light.background 100%);
    }
  }

</style>
