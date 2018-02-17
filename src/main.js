import Vue from "vue";
import { Vuetify, VSelect, VChip } from "vuetify/es5/components";
import App from "./App";
import router from "./router";
import store from "./store";
import apolloProvider from "./graphql";
import i18n from "./i18n";
import colors from "vuetify/es5/util/colors";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
	theme: {
		primary: "#f6416c",
		accent: "#f6416c",
		secondary: colors.grey.darken3,
		info: colors.blue.base,
		warning: colors.amber.base,
		error: colors.red.accent2,
		success: colors.green.base
	}
});
VSelect.components.VChip = VChip;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	provide: apolloProvider.provide(),
	i18n,
	render: h => h(App)
});
