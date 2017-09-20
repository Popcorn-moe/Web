import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createNetworkInterface, addTypename } from './network-interface.js'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${process.env.API_URL}/graphql`,
  }),
  queryTransformer: addTypename,
  dataIdFromObject: data => {
    if (data.__typename == 'Anime')
      return data.names[0]
    else
      return data.id
  }
})

export default new VueApollo({
  defaultClient: client,
})