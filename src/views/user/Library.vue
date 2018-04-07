<template>
		<v-container fluid grid-list-md>
			<v-btn
				v-if="$vuetify.breakpoint.xs && $route.name !== 'UserLibrary'"
				absolute
				fab
				small
				color="primary"
				class="ma-2"
				style="z-index: 3"
				:to="{ name: 'UserLibrary' }"
			>
				<v-icon>arrow_back</v-icon>
			</v-btn>
			<v-layout row wrap fill-height>
				<v-flex sm9 xs12 v-if="$vuetify.breakpoint.smAndUp || $route.name !== 'UserLibrary'">
					<router-view></router-view>
				</v-flex>
				<v-flex sm3 xs12 v-if="$vuetify.breakpoint.smAndUp || $route.name === 'UserLibrary'">
					<v-list dense class="settings-nav elevation-2">
						<v-list-tile
							:to="{ name: 'UserLibraryFollows', params: { page: 'library' } }"
							active-class="primary white--text"
						>
							<v-list-tile-content>
								<v-list-tile-title v-t="'route.user_library.follows'"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-subheader>Playlists</v-subheader>
						<!-- <v-list-tile
							v-for="route in route.children"
							:key="route.name"
							:to="{ name: route.name, params: { page: 'settings' } }"
							active-class="primary white--text"
						>
							<v-list-tile-avatar>
								<v-icon v-text="route.icon"></v-icon>
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title v-t="route.t"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile> -->
					</v-list>
				</v-flex>
			</v-layout>
		</v-container>
</template>


<script>
import { VIcon, VBtn, VSubheader } from "vuetify";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";

import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import gql from "graphql-tag";

export default {
	name: "user-library",
	props: {
		userId: String
	},
	data() {
		return {
			me: null,
			user: null
		};
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VSubheader,
		VIcon,
		VBtn
	},
	computed: {
		isMe() {
			return this.me && this.user.id === this.me.id;
		},
		playlists() {
			console.log(this.user.playlists);
			return this.user.playlists;
		}
	},
	apollo: {
		user: {
			query: gql`
				query userById($id: ID!) {
					userById(id: $id) {
						id
						avatar
						login
						playlists {
							id
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
		},
		me: {
			query: gql`
				{
					me {
						id
					}
				}
			`,
			update: ({ me }) => me
		}
	}
};
</script>

<style lang="stylus">
	@import "../../stylus/main.styl";

</style>
