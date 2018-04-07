<template>
	<v-container fluid grid-list-md v-if="user">
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
					<v-subheader>
						Playlists 
						<v-btn icon @click.stop="add = !add" v-if="isMe">
							<v-icon>{{ add ? 'clear' : 'add'}}</v-icon>
						</v-btn>
					</v-subheader>
					<v-list-tile v-if="add && isMe">
						<v-text-field
							label="Playlist Name"
							v-model="playlistName"
							clearable
						></v-text-field>
						<v-btn icon @click.stop="addPlaylist"><v-icon>save</v-icon></v-btn>
					</v-list-tile>
					<v-list-tile v-for="playlist in playlists" :key="playlist.id">
						<v-list-tile-content>
							<v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action>
							<v-btn icon ripple @click.native.stop="deletePlaylist(playlist)">
								<v-icon color="grey lighten-1">delete</v-icon>
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</v-list>
			</v-flex>
		</v-layout>
		<v-dialog v-model="del" max-width="320">
			<v-card v-if="delPlaylist">
				<v-card-title class="headline">Supprimer cette playlist ?</v-card-title>
				<v-card-text>Voulez vous vraiment supprimer la playlist "{{ delPlaylist.name || 'noname' }}"</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="darken-1" flat @click.native="del = false">Annuler</v-btn>
					<v-btn color="primary darken-1" flat @click.native="deletePlaylist(delPlaylist)">Supprimer</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>


<script>
import { VIcon, VBtn, VSubheader, VTextField, VDialog } from "vuetify";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import {
	VCard,
	VCardTitle,
	VCardActions,
	VCardText
} from "vuetify/es5/components/VCard";
import {
	VContainer,
	VFlex,
	VLayout,
	VSpacer
} from "vuetify/es5/components/VGrid";
import gql from "graphql-tag";

export default {
	name: "user-library",
	props: {
		userId: String
	},
	data() {
		return {
			me: null,
			user: null,
			add: false,
			del: false,
			delPlaylist: null,
			playlistName: null
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
		VBtn,
		VTextField,
		VCard,
		VSpacer,
		VDialog,
		VCardTitle,
		VCardActions,
		VCardText
	},
	computed: {
		isMe() {
			return this.me && this.user.id === this.me.id;
		},
		playlists() {
			return this.user.playlists;
		}
	},
	methods: {
		addPlaylist() {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation($name: String!) {
							addPlaylist(name: $name)
						}
					`,
					variables: {
						name: this.playlistName
					}
				})
				.then(() => {
					this.$apollo.queries.user.refetch();
					this.add = false;
					this.playlistName = null;
				});
		},
		deletePlaylist(playlist) {
			if (!this.del) {
				this.del = true;
				this.delPlaylist = playlist;
				return;
			}

			this.$apollo
				.mutate({
					mutation: gql`
						mutation($id: ID!) {
							remPlaylist(id: $id)
						}
					`,
					variables: {
						id: playlist.id
					}
				})
				.then(() => {
					this.$apollo.queries.user.refetch();
					this.del = false;
					this.delPlaylist = null;
				});
		}
	},
	apollo: {
		user: {
			query: gql`
				query userById($id: ID!) {
					userById(id: $id) {
						id
						playlists {
							id
							name
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
