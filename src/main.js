import Vue from 'vue'
import { Vuetify } from 'vuetify/es5/components'
import App from './App'
import router from './router'
import store from './store'
import apolloProvider from './graphql'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  i18n,
  render: h => h(App)
})
