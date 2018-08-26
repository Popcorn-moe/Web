<template>
	<div class="elevation-2">
		<v-layout row wrap fill-height>
			<v-flex sm4 xs12 class="left-panel">
				<div class="hidden-sm-and-up text-xs-center">
					<object data="/static/logo-animated.svg" type="image/svg+xml" width="200"></object>
				</div>
				<h3 class="pt-4 text-xs-center" v-t="'login.connect_with'"></h3>
				<div class="social-buttons pa-2">
					<v-btn color="google-color" depressed large block @click.stop="login('google')">
						<img src="/static/icons/google-icon.svg">
						Google
					</v-btn>
					<v-btn color="discord-color" depressed large block @click.stop="login('discord')">
						<img src="/static/icons/discord-icon.svg">
						Discord
					</v-btn>
					<v-btn color="twitter-color" depressed large block @click.stop="login('twitter')">
						<img src="/static/icons/twitter-icon.svg">
						Twitter
					</v-btn>
					<v-btn color="kitsu-color" depressed large block @click.stop="login('kitsu')">
						<img src="/static/icons/kitsu-icon.svg">
						Kitsu
					</v-btn>
				</div>
			</v-flex>
			<v-flex class="fields-container" sm8 xs12>
				<div class="px-5">
					<div class="hidden-xs-only text-xs-center">
						<object data="/static/logo-animated.svg" type="image/svg+xml" width="160"></object>
					</div>
					<v-alert
						v-if="alert"
						:info="alert.info"
						:error="alert.error"
						:success="alert.success"
						:warning="alert.warning"
						dismissible
						:value="true"
						@input="alert = null">
						{{ alert.text }}
					</v-alert>
					<v-text-field
						:label="$t('login.login')"
						v-model="username"
					/>
					<v-text-field
						:label="$t('login.password')"
						v-model="password"
						:append-icon="hidePassword ? 'visibility' : 'visibility_off'"
						@click:append="hidePassword = !hidePassword"
						:type="hidePassword ? 'password' : 'text'"
					/>
					<div class="text-xs-right">
						<v-btn class="pa-1" dark color="secondary black--text" depressed large @click.stop="login()" v-t="'login.connect'"></v-btn>
					</div>
				</div>
				<div class="pa-3">
					<router-link class="link" replace :to="{ name: 'SignUp' }" v-t="'login.sign_up'"></router-link>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { VBtn, VTextField, VIcon, VAlert } from "vuetify";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { login, ssoLogin } from "../../utils/auth";
import { mapActions } from "vuex";

export default {
	data() {
		return {
			username: "",
			password: "",
			hidePassword: true,
			alert: null
		};
	},
	components: {
		VAlert,
		VBtn,
		VTextField,
		VContainer,
		VFlex,
		VLayout
	},
	methods: {
		...mapActions({
			setIsAuth: "setIsAuth"
		}),
		login(provider) {
			if (provider) {
				ssoLogin(provider, location.origin + this.$router.last);
			} else {
				login(this.username, this.password)
					.then(() => this.$router.go(-1))
					.catch(error => {
						if (error.alert) this.alert = error.alert;
						else return Promise.reject(error);
					});
			}
		}
	},
	i18n: {
		messages: {
			fr: {
				login: {
					connect_with: "Se connecter avec :",
					connect: " Se connecter",
					sign_up: "Créer un compte",
					login: "E-mail / Pseudo",
					password: "Mot de passe"
				}
			},
			en: {
				login: {
					connect_with: "Connect With :",
					connect: "Sign in",
					sign_up: "Sign up",
					login: "E-mail / Login",
					password: "Password"
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
			background-color: rgba(255, 255, 255, 0.70);
		}

		.social-buttons {
			@media (max-width: 600px) {
				padding: 10%;
			}

			.v-btn {
				img {
					position: absolute;
					left: -10px;
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
