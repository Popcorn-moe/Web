import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale:
		localStorage.getItem("locale") ||
		(navigator.languages ? navigator.languages[0] : navigator.language),
	messages: {
		en: {
			route: {
				index: "Index",
				search: "Search",
				news: "News",
				auth: {
					profile: "Profile",
					library: "Library",
					follows: "Follows",
					followers: "Followers",
					settings: "Settings",
					logout: "Logout"
				},
				user_settings: {
					account: "My Account",
					connections: "Connections"
				}
			},
			anime_status: {
				PENDING: "Currently airing",
				FINISHED: "Finished",
				NOT_STARTED: "Not started"
			},
			navbar: {
				dark: "Dark"
			}
		},
		fr: {
			route: {
				index: "Accueil",
				search: "Rechercher",
				news: "Nouveautés",
				auth: {
					profile: "Profil",
					library: "Librairie",
					follows: "Abonnements",
					followers: "Abonnés",
					settings: "Paramètres",
					logout: "Se deconnecter"
				}
			},
			anime_status: {
				PENDING: "En cours",
				FINISHED: "Terminé",
				NOT_STARTED: "Non démarré"
			},
			navbar: {
				dark: "Foncé"
			}
		}
	},
	fallbackLocale: "en"
});

export default i18n;

export function isNull(val) {
	return val === null || val === undefined;
}

function _translate(
	messages,
	locale,
	fallback,
	key,
	host,
	interpolateMode,
	args
) {
	let res = this._interpolate(
		locale,
		messages[locale],
		key,
		host,
		interpolateMode,
		args
	);
	if (!isNull(res)) return res;

	if (locale.indexOf("-") !== -1)
		return this._translate(
			messages,
			locale.split("-", 1)[0],
			fallback,
			key,
			host,
			interpolateMode,
			args
		);

	res = this._interpolate(
		fallback,
		messages[fallback],
		key,
		host,
		interpolateMode,
		args
	);
	if (!isNull(res)) {
		if (process.env.NODE_ENV !== "production" && !this._silentTranslationWarn) {
			console.warn(
				`[vue-i18n] Fall back to translate the keypath '${key}' with '${fallback}' locale.`
			);
		}
		return res;
	} else {
		return null;
	}
}

Object.getPrototypeOf(i18n)._translate = _translate;
