import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'

Vue.use(Router)

export const routes = [
  {
    icon: 'home',
    path: '/',
    name: 'index',
    component: Index
  },
  {
    icon: 'search',
    path: '/search',
    name: 'Search'
  },
  {
    icon: 'equalizer',
    path: '/news',
    name: 'News'
  },
  {
    hide: true,
    name: 'Login',
    path: '/auth/login',
    component: Login
  },
  {
    hide: true,
    name: 'SignUp',
    path: '/auth/signup',
    component: SignUp
  }
];

export default new Router({
  routes
})
