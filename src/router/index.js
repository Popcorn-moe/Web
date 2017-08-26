import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

Vue.use(Router)

export const routes = [
  {
    icon: 'home',
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    icon: 'search',
    path: '/search',
    name: 'Search'
  },
  {
    icon: 'view_week',
    path: '/news',
    name: 'News'
  }
];

export default new Router({
  routes
})
