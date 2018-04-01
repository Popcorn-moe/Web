<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex 
        v-for="user in follows" 
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
	name: "user-follows",
	props: ["userId"],
	data() {
		return {
			user: null
		};
	},
	computed: {
		follows() {
			return this.user && this.user.follows;
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
						follows {
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
