import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Search from '../components/SearchPage'
import AnimePage from '../components/AnimePage'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'

Vue.use(Router)

export const routes = [
  {
    icon: 'home',
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    icon: 'search',
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    icon: 'equalizer',
    path: '/news',
    name: 'News'
  },
  {
    hide: true,
    path: '/anime',
    name: 'Anime',
    component: AnimePage
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

const router = new Router({
  routes
})

router.afterEach((to, from) => {
  if (!from.path.startsWith('/auth')) {
    router.last = from.path
  }
})

export default router;
