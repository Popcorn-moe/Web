import Vue from 'vue'
import { ApolloClient, IntrospectionFragmentMatcher } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-sse'
import introspectionQueryResultData from './fragmentTypes.json';
import { createNetworkInterface } from './network-interface.js'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const httpClient = createNetworkInterface({uri: `${process.env.API_URL}/graphql`,});
const sseClient =  new SubscriptionClient(`${process.env.API_URL}/subscriptions`, { reconnect: true });

export const client = new ApolloClient({
  networkInterface: addGraphQLSubscriptions(httpClient, sseClient),
  dataIdFromObject: ({ id }) => id,
  fragmentMatcher,
  addTypename: true
})

export default new VueApollo({
  defaultClient: client
})
