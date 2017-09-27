import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Search from '../components/SearchPage'
import AnimePage from '../components/AnimePage'
import MediaPage from '../components/MediaPage'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'
import UserPage from '../components/user/UserPage.vue'

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
    path: '/anime/:id',
    name: 'Anime',
    component: AnimePage,
    props: true
  },
  {
    hide: true,
    path: '/anime/:id/:media',
    name: 'Media',
    component: MediaPage,
    meta: { hasPlayer: true },
    props: true
  },
  {
    hide: true,
    path: '/anime/:id/:season/:episode',
    name: 'Episode',
    component: MediaPage,
    meta: { hasPlayer: true },
    props: true
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
  },
  {
    hide: true,
    name: 'User',
    path: '/user/:page(profile|library|settings)',
    component: UserPage,
    props: true
  },
  {
    hide: true,
    name: '404',
    path: '/404'
  },
  {
    hide: true,
    path: '*',
    redirect: '/404'
  },
];

const router = new Router({
  routes,
  mode: 'history'
})

router.afterEach((to, from) => {
  if (!from.path.startsWith('/auth')) {
    router.last = from.path
  }
})

export default router;
