import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
	InMemoryCache,
	IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
/*import {
	SubscriptionClient
} from "subscriptions-transport-sse";*/
import introspectionQueryResultData from "./fragmentTypes.json";

Vue.use(VueApollo);

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData
});

const cache = new InMemoryCache({
	addTypename: true,
	dataIdFromObject: ({ id }) => id,
	fragmentMatcher
});

const link = new HttpLink({
	uri: `${process.env.API_URL}/graphql`,
	credentials: "include"
});

/*const sseClient = new SubscriptionClient(
	`${process.env.API_URL}/subscriptions`,
	{ reconnect: true }
);*/

export const client = new ApolloClient({
	link,
	cache
});

export default new VueApollo({
	defaultClient: client
});
