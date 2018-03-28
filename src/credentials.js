import { login, ssoLogin, PROVIDERS } from "./utils/auth";
import store from "./store";

const INVERTED_PROVIDERS = Object.entries(PROVIDERS).reduce(
	(c, [key, value]) => ((c[value] = key), c),
	{}
);

export default function autoSignIn() {
	if (window.PasswordCredential || window.FederatedCredential) {
		navigator.credentials
			.get({
				password: true,
				federated: {
					providers: Object.values(PROVIDERS)
				}
			})
			.then(cred => {
				if (cred) {
					switch (cred.type) {
						case "password":
							login(cred.id, cred.password);
							break;
						case "federated":
							ssoLogin(INVERTED_PROVIDERS[cred.provider]);
							break;
					}
				}
			});
	}
}
