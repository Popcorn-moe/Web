import router from "../router";
import store from "../store";

export function needAuth() {
	if (!store.state.isAuth) router.push({ name: "Login" });
}
