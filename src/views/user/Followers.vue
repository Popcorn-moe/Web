<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex 
        v-for="user in followers" 
        :key="user.id"
        md4
        sm6
        xs12
      >
        <user :user="user"></user>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { VCard } from "vuetify";
import User from "../../components/user/User.vue";

import gql from "graphql-tag";

export default {
	name: "user-followers",
	props: ["userId"],
	data() {
		return {
			user: null
		};
	},
	computed: {
		followers() {
			return this.user && this.user.followers;
		}
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VCard,
		User
	},
	apollo: {
		user: {
			query: gql`
				query($id: ID!) {
					userById(id: $id) {
						id
						followers {
							id
							login
							avatar
						}
					}
				}
			`,
			variables() {
				return {
					id: this.userId
				};
			},
			skip() {
				return !this.userId;
			},
			update: ({ userById }) => userById
		}
	}
};
</script>
