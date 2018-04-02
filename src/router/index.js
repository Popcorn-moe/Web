import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { IS_LOADING } from "../store/app";
Vue.use(Router);

export const routes = [
	{
		icon: "home",
		path: "/",
		name: "Index",
		t: "route.index",
		component: () => import("../views/Index")
	},
	{
		icon: "search",
		path: "/search",
		name: "Search",
		t: "route.search",
		component: () => import("../views/Search")
	},
	{
		icon: "equalizer",
		path: "/news",
		name: "News",
		t: "route.news",
		component: () => import("../views/news/NewsList.vue")
	},
	{
		hide: true,
		path: "/news/:id",
		name: "NewsPage",
		component: () => import("../views/news/News.vue"),
		props: true
	},
	{
		hide: true,
		path: "/anime/:id",
		name: "Anime",
		component: () => import("../views/Anime"),
		props: true
	},
	{
		hide: true,
		path: "/anime/:id/:mediaId",
		name: "Media",
		component: () => import("../views/Media"),
		meta: { hasPlayer: true, removeMobileNavbar: true },
		props: true
	},
	{
		hide: true,
		path: "/anime/:id/:season/:episode",
		name: "Episode",
		component: () => import("../views/Media"),
		meta: { hasPlayer: true, removeMobileNavbar: true },
		props: true
	},
	{
		hide: true,
		path: "/author/:id",
		name: "Author",
		component: () => import("../views/Author"),
		meta: { hasPlayer: true },
		props: true
	},
	{
		hide: true,
		name: "Login",
		path: "/auth/login",
		component: () => import("../views/auth/Login")
	},
	{
		hide: true,
		name: "SignUp",
		path: "/auth/signup",
		component: () => import("../views/auth/SignUp")
	},
	{
		hide: true,
		name: "User",
		path: "/user/:userLogin/:page(profile|library|follows|followers|settings)",
		component: () => import("../views/user/User"),
		props: true
	},
	{
		hide: true,
		name: "Translations",
		path: "/translations",
		component: () => import("../views/Translations")
	},
	{
		hide: true,
		name: "404",
		path: "/404",
		component: () => import("../views/404")
	},
	{
		hide: true,
		path: "*",
		redirect: "/404"
	}
];

const router = new Router({
	routes,
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return { selector: to.hash };
		} else if (from.name != to.name) {
			return new Promise(r => setTimeout(() => r({ x: 0, y: 0 }), 300)); // 300 ms = slide transition time
		}
	}
});

let timeout;

router.afterEach((to, from) => {
	if (!from.path.startsWith("/auth/")) {
		router.last = from.path;
	}
	if (timeout) clearTimeout(timeout);
	store.commit(IS_LOADING, false);
});

router.beforeEach((to, from, next) => {
	timeout = setTimeout(() => {
		store.commit(IS_LOADING, true);
		timeout = null;
	}, 500); //Debouce
	next();
});

export default router;
