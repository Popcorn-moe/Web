import cookies from "../utils/cookies";
import { exchangeSSOToken, isLoggedIn } from "../utils/auth";

export const SET_DARK_THEME = "DARK_THEME";
export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const IS_AUTH = "IS_AUTH";
export const IS_LOADING = "IS_LOADING";

const state = {
	darkTheme: localStorage.getItem("darkTheme") === "true",
	drawer: (localStorage.getItem("drawer") || "true") === "true",
	isLoading: true,
	isAuth: null
};

export function onLoad(store) {
	window.addEventListener(
		"storage",
		event => {
			switch (event.key) {
				case "darkTheme":
					store.commit(SET_DARK_THEME, event.newValue === "true");
					break;
				case "drawer":
					store.commit(TOGGLE_DRAWER, event.newValue === "true");
					break;
			}
		},
		false
	);
	if (cookies.ssoExchange) {
		return exchangeSSOToken(cookies.ssoExchange);
	} else if (localStorage.getItem("csrf")) {
		return isLoggedIn().then(isAuth => store.dispatch("setIsAuth", isAuth));
	} else {
		store.dispatch("setIsAuth", false);
		return Promise.resolve();
	}
}

const mutations = {
	[SET_DARK_THEME](state, darkTheme) {
		state.darkTheme = darkTheme;
	},
	[TOGGLE_DRAWER](state, drawer) {
		state.drawer = drawer;
	},
	[IS_AUTH](state, isAuth) {
		state.isAuth = isAuth;
	},
	[IS_LOADING](state, isLoading) {
		state.isLoading = isLoading;
	}
};

const actions = {
	setDarkTheme({ commit }, darkTheme) {
		commit(SET_DARK_THEME, darkTheme);
		localStorage.setItem("darkTheme", darkTheme);
	},
	toggleDrawer({ commit }, drawer) {
		commit(TOGGLE_DRAWER, drawer);
		localStorage.setItem("drawer", drawer);
	},
	setIsAuth({ commit }, isAuth) {
		commit(IS_AUTH, isAuth);
	}
};

const getters = {
	darkTheme: ({ darkTheme }) => darkTheme,
	drawer: ({ drawer }) => drawer,
	isAuth: ({ isAuth }) => isAuth,
	isLoading: ({ isLoading }) => isLoading
};

export default {
	state,
	mutations,
	actions,
	getters
};
