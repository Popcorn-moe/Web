<template>
  <div class="rating">
     <v-slider class="slider" :value="value" v-model="rate" thumb-label hide-details step="1" min="0" max="100"></v-slider>
     <div 
      v-for="({rate}) in lastRates" 
      :key="rate"
      class="point"
      :style="{ left: `calc(${rate}% - 2px)` }"
    ></div>
    <v-tooltip 
      :value="showName(r)"  
      v-for="(r, i) in lastRates" 
      :key="i" 
      top
    >
      <div 
        class="tooltip" 
        slot="activator"
        :style="{ left: `${r.rate}%` }"
      ></div>
      <span>{{ r.name }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { VIcon, VSlider, VTooltip } from "vuetify";

export default {
	name: "Rating",
	props: {
		value: { type: Number, default: 50 },
		lastRates: { type: Array }
	},
	data() {
		return {
			rate: 50,
			focus: false
		};
	},
	components: {
		VIcon,
		VSlider,
		VTooltip
	},
	methods: {
		showName(r) {
			return r.rate == this.rate;
		}
	}
};
</script>

<style lang="stylus">
  @import '../stylus/main.styl';

  .rating {
    position: relative;
    text-align: left;

    .slider {
      padding: 0 !important
      z-index: 1;
    }

    .tooltip {
      top: -10px !important;
      width: 1px;
    }

    .point {
      display: inline-block;
      z-index: 0;
      position: relative;
      top: -27px;
      height: 10px;
      width: 2px;
      background-color: black;
    }
  }
</style>
