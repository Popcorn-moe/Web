import Vue from "vue";
import VueApollo from "vue-apollo";
import createClient from "@popcorn.moe/apollo";

Vue.use(VueApollo);

export const client = createClient();

export default new VueApollo({
	defaultClient: client
});
