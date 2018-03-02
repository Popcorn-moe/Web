<template>
  <img v-bind="$attrs" v-on="$listeners" @load="loading = false" @error="loading = false" :class="{ loading }">
</template>

<script>
export default {
	data() {
		return {
			loading: true
		};
	}
};
</script>

<style>
img.loading {
	color: transparent;
	filter: blur(5px);
}
</style>
