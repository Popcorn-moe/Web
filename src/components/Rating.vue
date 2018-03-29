<template>
  <div class="rating">
    <v-icon v-for="n in length"
        :key="n"
        :class="{ over: n <= over, active: n <= value, star: true }"
        @mouseover="over = n"
        @mouseout="over = -1"
        @click="$emit('input', n)"
    >
    star
    </v-icon>
  </div>
</template>

<script>
import { VIcon } from "vuetify";

export default {
	name: "Rating",
	props: {
		value: { type: Number },
		length: { type: Number, default: 5 }
	},
	data() {
		return {
			over: 0
		};
	},
	components: {
		VIcon
	}
};
</script>

<style lang="stylus">
  @import '../stylus/main.styl';

  .rating .star {
    cursor: pointer;
    color: $grey.lighten-1;

    &.active {
      color: $yellow.base;
    }

    &.over {
      color: $blue.base;
    }
  }
</style>
