import Vue from "vue";
import { Vuetify } from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueHead from "vue-head";
import App from "./App";
import router from "./router";
import store, { onLoad } from "./store";
import apolloProvider from "./graphql";
import i18n from "./i18n";
import autoSignIn from "./credentials";
import VueTimeago from "vue-timeago";

const mainColor = "#f6416c";
const secondaryColor = "#fddd84";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
	theme: {
		primary: mainColor,
		accent: mainColor,
		secondary: secondaryColor,
		info: colors.blue.base,
		warning: colors.amber.base,
		error: colors.red.accent2,
		success: colors.green.base
	}
});

Vue.use(VueHead, {
	separator: "-",
	complement: "Popcorn.moe"
});

// vue-timeago
Vue.use(VueTimeago, {
	name: "timeago",
	locale: "en",
	locales: {
		fr: require("date-fns/locale/fr"),
		en: require("date-fns/locale/en")
	}
});

/* eslint-disable no-new */
window.vue = new Vue({
	el: "#app",
	router,
	store,
	provide: apolloProvider.provide(),
	i18n,
	render: h => h(App)
});

onLoad(store).then(() => {
	if (!store.state.isAuth) autoSignIn();
});
