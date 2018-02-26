<template>
  <v-app :light="isAuth ? true : !darkTheme" :dark="isAuth ? false : darkTheme">
    <v-slide-x-transition mode="out-in">
      <auth-layout v-if="isAuth"></auth-layout>
      <layout v-else></layout>
    </v-slide-x-transition>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { VApp } from "vuetify/es5/components";
import { VSlideXTransition } from "vuetify/es5/components/transitions";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";

export default {
	components: {
		Layout,
		AuthLayout,
		VApp,
		VSlideXTransition
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
			return this.$route.path.match("auth");
		}
	},
	head: {
		meta() {
			return [
				{ property: "og:url", content: window.location.href, id: "og:url" }
			];
		}
	}
};
</script>
