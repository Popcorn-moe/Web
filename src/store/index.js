import Vue from "vue";
import Vuex from "vuex";

import app, { onLoad } from "./app";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true, // process.env.NODE_ENV !== 'production',
	...app
});

onLoad(store);

export default store;
