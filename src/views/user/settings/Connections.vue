<template>
  <v-container>
	  	<v-layout row wrap>
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
						<v-toolbar-title class="white--text">{{ account.name }}: DeltaEvo</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon class="white--text">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-divider></v-divider>
					<v-card-text>
						<v-switch class="display-switch" hide-details label="Show on profile"></v-switch>
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

const INFOS = {
	twitter: {
		icon: "/static/icons/twitter-icon.svg",
		color: "twitter-color",
		name: "Twitter"
	},
	google: {
		icon: "/static/icons/google-icon.svg",
		color: "google-color",
		name: "Google"
	}
};

export default {
	data() {
		return {
			accounts: [
				{
					type: "twitter",
					...INFOS["twitter"]
				},
				{
					type: "google",
					...INFOS["google"]
				}
			]
		};
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
	}
};
</script>

<style>
.display-switch label {
	color: white !important;
}
</style>
