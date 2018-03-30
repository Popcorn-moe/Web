<template>
	<v-list v-if="result.users.length || result.animes.length">
		<template v-if="result.users.length">
			<v-subheader inset v-t="'search_results.users'"></v-subheader>
			<v-list-tile
			 avatar
			 v-for="user in result.users"
			 :key="user.id"
			 :to="{ name: 'User', params: { userLogin: user.login, page: 'profile' } }"
			 @click.stop="$emit('close')"
			>
			<v-list-tile-avatar>
				<img :src="user.avatar">
			</v-list-tile-avatar>
			<v-list-tile-content>
				<v-list-tile-title>{{ user.login }}</v-list-tile-title>
				<v-list-tile-sub-title>{{ user.status }}</v-list-tile-sub-title>
			</v-list-tile-content>
			</v-list-tile>
		</template>
		<v-divider inset v-if="result.users.length && result.animes.length"></v-divider>
		<template v-if="result.animes.length">
			<v-subheader inset>Animes</v-subheader>
			<v-list-tile v-for="anime in result.animes" :key="anime.id" :to="{ name: 'Anime', params: { id: anime.id }}"  @click.stop="$emit('close')" avatar>
			<v-list-tile-avatar>
				<img :src="anime.cover">
			</v-list-tile-avatar>
			<v-list-tile-content>
				<v-list-tile-title>{{ anime.names[0] }}</v-list-tile-title>
				<v-list-tile-sub-title>{{ anime.release_date }}</v-list-tile-sub-title>
			</v-list-tile-content>
			</v-list-tile>
		</template>
	</v-list>
</template>

<script>
import { VDivider, VSubheader } from "vuetify";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileTitle,
	VListTileContent,
	VListTileAvatar,
	VListTileSubTitle
} from "vuetify/es5/components/VList";
import gql from "graphql-tag";

export default {
	props: ["query"],
	data() {
		return {
			result: {
				users: [],
				animes: []
			}
		};
	},
	components: {
		VDivider,
		VSubheader,
		VList,
		VListGroup,
		VListTile,
		VListTileTitle,
		VListTileContent,
		VListTileAvatar,
		VListTileSubTitle
	},
	apollo: {
		result: {
			query: gql`
				query($name: String!) {
					users: searchUser(name: $name, limit: 2) {
						id
						login
						avatar
					}
					animes: searchAnime(name: $name, limit: 2) {
						id
						names
						cover
						release_date
					}
				}
			`,
			variables() {
				return {
					name: this.query || ""
				};
			},
			update: data => data
		}
	},
	i18n: {
		messages: {
			fr: {
				search_results: {
					users: "Utilisateurs"
				}
			},
			en: {
				search_results: {
					users: "Users"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>
