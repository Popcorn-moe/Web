import Vue from 'vue'
import { ApolloClient, IntrospectionFragmentMatcher } from 'apollo-client'
import introspectionQueryResultData from './fragmentTypes.json';
import { createNetworkInterface } from './network-interface.js'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${process.env.API_URL}/graphql`,
  }),
  dataIdFromObject: ({ id }) => id,
  fragmentMatcher,
  addTypename: true
})

export default new VueApollo({
  defaultClient: client
})
