<template>
  <v-container fluid class="follows">
    <v-layout row wrap>
			<v-flex xs12 class="text-xs-center nodata" v-if="follows.length == 0">
				<p>Cet utilisateur ne follow personne</p>
			</v-flex>
      <v-flex 
				v-else
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
			return (this.user && this.user.follows) || [];
		}
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VCard,
		User
	},
	i18n: {
		messages: {
			en: {
				follows: {
					nodata: "This user follow anyone"
				}
			},
			fr: {
				follows: {
					nodata: "Cet utilisateur ne suis personne"
				}
			}
		}
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

<style lang="stylus">
  @import '../../stylus/main.styl'

	.follows {
		.nodata {
			min-height: 340px !important;

			p {
				line-height: 340px !important;
				font-size: 25px;
			}
		}
	}


	@media (max-width: 600px) {
		.follows {
			.nodata {
				p {
					font-size: 4vw
				}
			}
		}
	}
</style>
