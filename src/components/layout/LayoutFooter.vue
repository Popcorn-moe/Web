<template>
	<v-footer class="footer pt-3" absolute inset app height="auto" ref="footer">
		<v-container grid-list-md class="pb-0">
			<v-layout row wrap>
				<v-flex sm6 lg4>
					<h3>A propos</h3>
					<p class="text-xs-justify">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</v-flex>
				<v-flex sm6 lg8 class="text-xs-center">
					<div class="vertical-center">
						<h1>Follow us</h1>
						<v-btn
							fab
							class="mx-3"
							color="primary"
							href="https://twitter.com/popcorn_moe"
							rel="noopener"
							target="_blank"
						>
								<img src="/static/icons/twitter-icon.svg" height="35px">
						</v-btn>
						<v-btn
							fab
							class="mx-3"
							color="primary"
							href="https://discord.gg/FEvvcWW"
							rel="noopener"
							target="_blank"
						>
								<img src="/static/icons/discord-icon.svg" height="35px">
						</v-btn>
						<v-btn
							fab
							class="mx-3"
							color="primary"
							href="https://github.com/Popcorn-moe"
							rel="noopener"
							target="_blank"
						>
								<img src="/static/icons/github-icon.svg" height="35px">
						</v-btn>
					</div>
				</v-flex>
			</v-layout>
			<v-layout row wrap justify-center>
				<v-btn flat>
					Mentions légales
				</v-btn>
				<v-btn flat>
					CGU
				</v-btn>
				<v-btn flat>
					A propos
				</v-btn>
			</v-layout>
			<div class="text-xs-right">
				<h6> Version: {{ version }} </h6>
			</div>
		</v-container>
	</v-footer>
</template>

<script>
import { VFooter, VBtn } from "vuetify";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { mapGetters } from "vuex";

export default {
	name: "Footer",
	data() {
		return {
			version: VERSION
		};
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VFooter,
		VBtn
	},
	mounted() {
		this.onResize();
		window.addEventListener("resize", this.onResize);
	},
	destroyed() {
		window.removeEventListener("resize", this.onResize);
	},
	watch: {
		["$vuetify.application.left"]() {
			this.onResize();
		}
	},
	methods: {
		onResize() {
			this.$refs.footer.callUpdate();
		}
	}
};
</script>

<style lang="stylus">
</style>
