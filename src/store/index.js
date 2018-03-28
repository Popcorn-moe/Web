import Vue from "vue";
import Vuex from "vuex";

import app from "./app";
export { onLoad } from "./app";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true, // process.env.NODE_ENV !== 'production',
	...app
});

export default store;
