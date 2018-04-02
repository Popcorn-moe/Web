<template>
	<label class="upload">
		<slot></slot>
		<input type="file" @change="setFiles">
	</label>
</template>

<script>
export default {
	name: "Upload",
	methods: {
		setFiles({ target: { files } }) {
			this.$emit("input", files);
		}
	}
};
</script>

<style lang="stylus">
.upload {
	display: inline-block;
	position: relative;
	width: 100%;
	height: 100%;

	input[type=file] {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		outline: none;
		cursor: inherit;
		display: block;
	}
}
</style>
