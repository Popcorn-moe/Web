import Vue from 'vue'
import * as VuetifyDirectives from 'vuetify/src/directives'
import Load from 'vuetify/src/util/load'
import App from './App'
import router from './router'
import store from './store'
import apolloProvider from './graphql'

Vue.config.productionTip = false

Object.keys(VuetifyDirectives).forEach(key => {
  Vue.directive(key, VuetifyDirectives[key])
})

Vue.prototype.$vuetify = {
  load: Load
}

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  render: h => h(App)
})
