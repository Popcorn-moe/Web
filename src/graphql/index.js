import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createNetworkInterface } from './network-interface.js'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${process.env.API_URL}/graphql`,
  }),
  dataIdFromObject: ({ id }) => id
})

export default new VueApollo({
  defaultClient: client,
})
