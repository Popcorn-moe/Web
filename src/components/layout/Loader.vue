<script>
import Loader from "!!vue-svg-loader!../../assets/loader.svg";

export default Loader;
</script>

<style lang="stylus">
	@import "../../stylus/main.styl";
	#root {
		display: block
		height: 100vh;
		width: 10%;
		margin auto auto;
		z-index: 2;

		&.float {
			height: inherit;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		#perso {
				animation: rotate 2s linear infinite;
				transform-origin: center;
				transform-box: fill-box;
		}
	}
</style>
