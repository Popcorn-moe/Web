import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { IS_LOADING } from '../store/app'
Vue.use(Router)

export const routes = [
  {
    icon: 'home',
    path: '/',
    name: 'Index',
    component: () => import('../components/Index')
  },
  {
    icon: 'search',
    path: '/search',
    name: 'Search',
    component: () => import('../components/SearchPage')
  },
  {
    icon: 'equalizer',
    path: '/news',
    name: 'News',
    component: () => import('../components/news/NewsList.vue')
  },
  {
    hide: true,
    path: '/news/:id',
    name: 'NewsPage',
    component: () => import('../components/news/NewsPage.vue'),
    props: true
  },
  {
    hide: true,
    path: '/anime/:id',
    name: 'Anime',
    component: () => import('../components/anime/AnimePage'),
    props: true
  },
  {
    hide: true,
    path: '/anime/:id/:media',
    name: 'Media',
    component: () => import('../components/media/MediaPage'),
    meta: { hasPlayer: true },
    props: true
  },
  {
    hide: true,
    path: '/anime/:id/:season/:episode',
    name: 'Episode',
    component: () => import('../components/media/MediaPage'),
    meta: { hasPlayer: true },
    props: true
  },
  {
    hide: true,
    name: 'Login',
    path: '/auth/login',
    component: () => import('../components/auth/Login')
  },
  {
    hide: true,
    name: 'SignUp',
    path: '/auth/signup',
    component: () => import('../components/auth/SignUp')
  },
  {
    hide: true,
    name: 'User',
    path: '/user/:page(profile|library|friends|settings)',
    component: () => import('../components/user/UserPage'),
    props: true
  },
  {
    hide: true,
    name: '404',
    path: '/404',
    component: () => import('../components/404')
  },
  {
    hide: true,
    path: '*',
    redirect: '/404'
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

router.afterEach((to, from) => {
  if (!from.path.startsWith('/auth')) {
    router.last = from.path
  }
  store.commit(IS_LOADING, false)
});

router.beforeEach((to, from, next) => {
  store.commit(IS_LOADING, true)
  next()
})

export default router;
