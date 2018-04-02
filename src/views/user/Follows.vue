<template>
  <v-container fluid class="follows">
    <v-layout row wrap v-if="user">
		<v-flex xs12 class="text-xs-center nodata" v-if="user.follows.length == 0">
			<p>Cet utilisateur ne follow personne</p>
		</v-flex>
		<v-flex 
			v-else
			v-for="u in user.follows" 
			:key="u.id"
			md4
			sm6
			xs12
		>
			<user :user="u"></user>
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
	props: ["user"],
	data() {
		return {};
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
