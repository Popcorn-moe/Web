<template>
  <v-app :light="isAuth ? true : !darkTheme" :dark="isAuth ? false : darkTheme">
    <v-fade-transition mode="out-in">
      <auth-layout v-if="isAuth"></auth-layout>
      <layout v-else></layout>
    </v-fade-transition>
	<floating
        v-if="!videoPlayer.destroyed && (videoPlayer.owner === null || videoPlayer.owner === 'floating' ) && !$route.meta.hasPlayer"
        :initial="{ 'bottom': '5px', 'right': '5px' }"
        @close="videoPlayer.destroy()"
    >
        <video-player owner='floating'></video-player>
    </floating>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { VApp } from "vuetify";
import { VFadeTransition } from "vuetify/es5/components/transitions";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import Floating from "./components/Floating";
import VideoPlayer, { videoPlayer } from "./components/player/GlobalPlayer";

export default {
	data() {
		return {
			videoPlayer
		};
	},
	components: {
		Layout,
		AuthLayout,
		VApp,
		VFadeTransition,
		Floating,
		VideoPlayer
	},
	watch: {
		$route() {
			this.$emit("updateHead");
		}
	},
	computed: {
		...mapGetters({
			darkTheme: "darkTheme"
		}),
		isAuth() {
			return this.$route.path.match("auth/");
		}
	},
	head: {
		meta() {
			return [
				{ property: "og:url", content: window.location.href, id: "og:url" },
				{
					property: "og:image",
					content: "https://popcorn.moe/static/logo.png",
					id: "og:image"
				},
				{
					property: "og:description",
					content: "An anime streaming website",
					id: "og:description"
				},
				{
					name: "description",
					content: "An anime streaming website",
					id: "description"
				}
			];
		}
	}
};
</script>
