<template>
  <v-container>
		<v-subheader>Profile</v-subheader>
		<v-layout row wrap>
			<v-flex xs12 sm4>
				<v-text-field v-model="me.login" label="Display Name"></v-text-field>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12 sm4>
				<v-text-field v-model="me.email" label="Email"></v-text-field>
			</v-flex>
		</v-layout>

		<v-divider class="mt-4"></v-divider>
		<v-subheader>Change Password</v-subheader>
		<v-layout row wrap>
			<v-flex xs12 sm4>
				<v-text-field type="password" label="Old Password"></v-text-field>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12 sm4>
				<v-text-field type="password" label="New Password"></v-text-field>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
import { VTextField, VDivider, VSubheader } from "vuetify";
import {
	VContainer,
	VFlex,
	VLayout,
	VSpacer
} from "vuetify/es5/components/VGrid";
import clone from "clone";
import gql from "graphql-tag";

export default {
	data() {
		return {
			me: {}
		};
	},
	components: {
		VTextField,
		VDivider,
		VSubheader,
		VContainer,
		VFlex,
		VLayout
	},
	apollo: {
		me: {
			query: gql`
				{
					me {
						id
						login
						email
					}
				}
			`,
			update: ({ me }) => clone(me)
		}
	}
};
</script>

<style>
</style>
