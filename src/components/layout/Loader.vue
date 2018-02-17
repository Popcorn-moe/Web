
<template>
  <div v-html="loader"></div>
</template>

<script>
import loader from "html-loader!../../assets/loader.svg";

export default {
	name: "Loader",
	data() {
		return {
			loader
		};
	}
};
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";
  #root {
    display: block
    height: 100vh;
    width: 10%;
    margin auto auto;
  }
</style>
