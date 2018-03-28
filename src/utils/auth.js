import { client } from "../graphql";
import gql from "graphql-tag";
import store from "../store";

export function isLoggedIn() {
	return client
		.query({
			query: gql`
				{
					me {
						id
					}
				}
			`,
			fetchPolicy: "network-only"
		})
		.then(({ data: { me } }) => me !== null);
}

export const PROVIDERS = {
	google: "https://accounts.google.com",
	facebook: "https://www.facebook.com",
	twitter: "https://api.twitter.com",
	discord: "https://discordapp.com",
	kitsu: "https://kitsu.io"
};

export function exchangeSSOToken(token) {
	return fetch(`${process.env.AUTH_URL}/ssoExchange`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			token
		}),
		credentials: "include"
	})
		.then(res => res.json())
		.then(({ csrf, ...fields }) => {
			localStorage.setItem("csrf", csrf);

			if (window.FederatedCredential) {
				const cred = new FederatedCredential({
					id: fields.email,
					name: fields.login,
					iconURL: fields.avatar.startsWith("https://")
						? fields.avatar
						: undefined,
					provider: PROVIDERS[fields.provider]
				});

				navigator.credentials.store(cred);
			}

			store.dispatch("setIsAuth", true);
			return fields;
		});
}

export function login(username, password) {
	return fetch(`${process.env.AUTH_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username,
			password
		}),
		credentials: "include"
	})
		.then(res => {
			if (res.status === 200) return res.json();
			else return res.json().then(alert => Promise.reject({ alert }));
		})
		.then(({ csrf, ...fields }) => {
			localStorage.setItem("csrf", csrf);

			console.log(fields);

			if (window.PasswordCredential) {
				const cred = new PasswordCredential({
					id: fields.email,
					password,
					name: fields.login,
					iconURL: fields.avatar.startsWith("https://")
						? fields.avatar
						: undefined
				});

				navigator.credentials.store(cred);
			}

			store.dispatch("setIsAuth", true);
			return fields;
		});
}

export function ssoLogin(provider, callback = window.location.href) {
	window.location.assign(
		`${process.env.AUTH_URL}/login/${provider}?callback=${encodeURIComponent(
			callback
		)}`
	);
}

export function logout() {
	localStorage.removeItem("csrf");
	if (navigator.credentials && navigator.credentials.preventSilentAccess) {
		// Turn on the mediation mode so auto sign-in won't happen
		// until next time user intended to do so.
		navigator.credentials.preventSilentAccess();
	}
	return Promise.resolve();
}

export function signup(login, email, password, newsletter) {
	return fetch(`${process.env.AUTH_URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			login,
			email,
			password,
			newsletter
		}),
		credentials: "include"
	})
		.then(res => res.json())
		.then(({ csrf }) => localStorage.setItem("csrf", csrf));
}
