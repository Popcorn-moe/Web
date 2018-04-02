<template>
  <v-container>
	  	<v-layout row wrap>
			<v-flex xs12>
				<v-btn color="google-color" small fab @click.stop="ssoLogin('google')">
					<img src="/static/icons/google-icon.svg" height="28px">
				</v-btn>
				<v-btn color="discord-color" small fab @click.stop="ssoLogin('discord')">
					<img src="/static/icons/discord-icon.svg" height="28px">
				</v-btn>
				<v-btn color="twitter-color" small fab @click.stop="ssoLogin('twitter')">
					<img src="/static/icons/twitter-icon.svg" height="28px">
				</v-btn>
				<v-btn color="kitsu-color" small fab @click.stop="ssoLogin('kitsu')">
					<img src="/static/icons/kitsu-icon.svg" height="28px">
				</v-btn>
			</v-flex>
			<v-flex
				v-for="account in accounts"
				:key="account.name"
				sm6
				xs12
				class="pa-2"
			>
				<v-card :color="account.color">
					<v-toolbar
						:color="`${account.color}--darken`"
						prominent
						card
					>
						<img height="24px" :src="account.icon">
						<v-toolbar-title>
							<div>
								<h4 class="white--text">{{ account.format() }}</h4>
								<h6 class="white--text social-name">{{ account.name }}</h6>
							</div>
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon class="white--text">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-divider></v-divider>
					<v-card-text>
						<v-switch :inputValue="account.show" light :color="`${account.color}--darken`" class="display-switch" hide-details label="Show on profile"></v-switch>
					</v-card-text>
				</v-card>
			</v-flex>
	  	</v-layout>
  </v-container>
</template>

<script>
import { VIcon, VBtn, VDivider, VSwitch } from "vuetify";
import {
	VContainer,
	VFlex,
	VLayout,
	VSpacer
} from "vuetify/es5/components/VGrid";
import { VToolbar, VToolbarTitle } from "vuetify/es5/components/VToolbar";
import { VCard, VCardText, VCardActions } from "vuetify/es5/components/VCard";
import gql from "graphql-tag";
import { ssoLogin } from "../../../utils/auth";

const INFOS = {
	twitter: {
		icon: "/static/icons/twitter-icon.svg",
		color: "twitter-color",
		name: "Twitter",
		format() {
			return this.username;
		}
	},
	google: {
		icon: "/static/icons/google-icon.svg",
		color: "google-color",
		name: "Google",
		format() {
			return this.username;
		}
	},
	discord: {
		icon: "/static/icons/discord-icon.svg",
		color: "discord-color",
		name: "Discord",
		format() {
			return `${this.username}#${this.discriminator}`;
		}
	}
};

export default {
	data() {
		return {
			accounts: []
		};
	},
	methods: {
		ssoLogin
	},
	components: {
		VIcon,
		VBtn,
		VDivider,
		VSwitch,
		VContainer,
		VFlex,
		VLayout,
		VSpacer,
		VToolbar,
		VToolbarTitle,
		VCard,
		VCardText,
		VCardActions
	},
	apollo: {
		accounts: {
			query: gql`
				{
					me {
						id
						discord {
							id
							username
							discriminator
						}
						twitter {
							id
							username
						}
					}
				}
			`,
			update: ({ me: { discord, twitter } }) =>
				Object.entries({ discord, twitter })
					.filter(([, value]) => value)
					.map(([type, value]) => ({
						type,
						...value,
						...INFOS[type],
						show: true
					}))
		}
	}
};
</script>

<style>
.display-switch label {
	color: white !important;
}

.social-name {
	font-weight: 200;
}
</style>
