<template>
	<div class="elevation-2">
		<v-layout row wrap fill-height>
            <v-flex sm4 xs12 class="left-panel">
				<div class="hidden-sm-and-up text-xs-center">
					<object data="/static/logo-animated.svg" type="image/svg+xml" width="200"></object>
				</div>
				<h3 class="pt-4 text-xs-center" v-t="'sign_up.sign_up_with'"></h3>
				<div class="social-buttons pa-2">
					<v-btn color="google-color" depressed large block @click.stop="signup('google')">
						<img src="/static/icons/google-icon.svg">
						Google
					</v-btn>
					<v-btn color="discord-color" depressed large block @click.stop="signup('discord')">
						<img src="/static/icons/discord-icon.svg">
						Discord
					</v-btn>
					<v-btn color="twitter-color" depressed large block @click.stop="signup('twitter')">
						<img src="/static/icons/twitter-icon.svg">
						Twitter
					</v-btn>
					<v-btn color="kitsu-color" depressed large block @click.stop="signup('kitsu')">
						<img src="/static/icons/kitsu-icon.svg">
						Kitsu
					</v-btn>
				</div>
			</v-flex>
			<v-flex class="fields-container" sm8 xs12>
				<div class="px-5 pt-3">
					<v-text-field v-model="login" :label="$t('sign_up.login')"></v-text-field>
					<v-text-field v-model="email" :label="$t('sign_up.mail')"></v-text-field>
					<v-text-field :label="$t('sign_up.password')"
												v-model="password"
												:append-icon="hidePassword ? 'visibility' : 'visibility_off'"
												:append-icon-cb="() => (hidePassword = !hidePassword)"
												:type="hidePassword ? 'password' : 'text'"></v-text-field>
					<v-text-field :label="$t('sign_up.password')"
												v-model="passwordConfirm"
												:append-icon="hidePasswordConfirm ? 'visibility' : 'visibility_off'"
												:append-icon-cb="() => (hidePasswordConfirm = !hidePasswordConfirm)"
												:type="hidePasswordConfirm ? 'password' : 'text'"></v-text-field>
					<v-checkbox :label="$t('sign_up.newsletter')" v-model="newsletter"></v-checkbox>
					<div class="text-xs-center">
						<v-btn class="pa-1" dark color="secondary" depressed large @click.stop="signup()" v-t="'sign_up.sign_up'"></v-btn>
					</div>
				</div>
				<div class="pa-3">
					<router-link class="link" replace :to="{ name: 'Login' }" v-t="'sign_up.sign_in'"></router-link>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { VBtn, VTextField, VCheckbox } from "vuetify";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { signup, ssoLogin } from "../../utils/auth";
import { mapActions } from "vuex";

export default {
	data() {
		return {
			login: "",
			email: "",
			password: "",
			passwordConfirm: "",
			newsletter: true,
			hidePassword: true,
			hidePasswordConfirm: true
		};
	},
	components: {
		VBtn,
		VTextField,
		VCheckbox,
		VContainer,
		VFlex,
		VLayout
	},
	methods: {
		...mapActions({
			setIsAuth: "setIsAuth"
		}),
		signup(provider) {
			if (provider) {
				ssoLogin(provider, location.origin + this.$router.last);
			} else {
				signup(this.login, this.email, this.password, this.newsletter).then(
					() => {
						this.$router.go(-1);
						this.setIsAuth(true);
					}
				);
			}
		}
	},
	i18n: {
		messages: {
			fr: {
				sign_up: {
					sign_up_with: "S'inscrire avec :",
					sign_up: "S'inscrire",
					login: "Pseudo",
					mail: "E-mail",
					password: "Mot de passe",
					newsletter: "Recevoir les newsletter",
					sign_in: "Se connecter"
				}
			},
			en: {
				sign_up: {
					sign_up_with: "Sign up with :",
					sign_up: "Sign up",
					login: "Login",
					mail: "E-mail",
					password: "Password",
					newsletter: "Get newsletter",
					sign_in: "Sign in"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
	@import '../../stylus/main.styl';

	.left-panel {
		background-color: white;

		@media (max-width: 600px) {
			background-color: rgba(255, 255, 255, 0.71);
		}

		.social-buttons {
			@media (max-width: 600px) {
				padding: 10%;
			}

			.btn {
				img {
					position: absolute;
					left: 10px;
					height: 35px;
				}
				border-radius: 10px;
				margin-top: 20px;
			}
		}
	}

	.fields-container {
		background-color: rgba(255, 255, 255, 0.70);

		.link {
			text-decoration: none;
			color: #4b4b4b !important;
		}
	}
</style>
