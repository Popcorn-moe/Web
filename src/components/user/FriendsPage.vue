<template>
  <v-container grid-list-md>
    <v-layout class="text-xs-center" v-if="isMe">
      <v-flex offset-xs2 xs8>
        <v-select
          :label="$t('friends.search')"
          autocomplete
          multiple
          chips
          prepend-icon="search"
          :search-input.sync="search"
          :items="searchResults"
          item-text="login"
          item-value="id"
          return-object
          v-model="selectedFriends"
          :no-data-text="$t('friends.no_results')"
        ></v-select>
      </v-flex>
      <v-flex xs1>
        <v-btn fab dark small color="primary" @click.stop="inviteFriends()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-flex v-for="friend in user.friends" :key="friend.id" v-if="!isMe" xs6>
      <div class="friend elevation-3">
        <v-layout>
          <v-flex xs3>
            <v-avatar size="75px" class="avatar">
              <img :src="friend.avatar" :alt="friend.login">
            </v-avatar>
          </v-flex>
          <v-flex xs9 class="text">
            <h6>{{ friend.login }}</h6>
            <div>{{ "STATUS" }}</div>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
		<v-layout v-if="isMe">
			<v-flex xs3>
				<v-list class="friends-tabs-list elevation-3">
					<v-list-tile @click.stop="currTab = 'friends'" :class="{'active': currTab === 'friends'}">
						<v-list-tile-content>
							<v-list-tile-title v-t="'friends.list'"></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile @click.stop="currTab = 'invites'" :class="{'active': currTab === 'invites'}">
						<v-list-tile-content>
							<v-list-tile-title v-t="'friends.invites'"></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile @click.stop="currTab = 'pending'" :class="{'active': currTab === 'pending'}">
						<v-list-tile-content>
							<v-list-tile-title v-t="'friends.pending_invites'"></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-flex>
			<v-flex xs9>
				<v-layout>
					<v-flex xs12>
						<v-tabs-items class="friends-tabs" :value="currTab">
							<v-tab-item id="friends">
								<v-layout row wrap>
									<v-flex v-for="friend in user.friends" :key="friend.id" xs6>
										<div class="friend elevation-3">
											<v-layout>
												<v-flex xs3>
													<v-avatar size="75px" class="avatar">
														<img :src="friend.avatar" :alt="friend.login">
													</v-avatar>
												</v-flex>
												<v-flex xs9 class="text">
													<v-btn small icon class="delete" @click.stop="removeFriend(friend.id)"><v-icon>delete</v-icon></v-btn>
													<h6>{{ friend.login }}</h6>
													<div>{{ "STATUS" }}</div>
												</v-flex>
											</v-layout>
										</div>
									</v-flex>
								</v-layout>
							</v-tab-item>
							<v-tab-item id="invites">
								<v-layout row wrap>
									<v-flex v-for="friend in friendRequests" :key="friend.id" xs6>
										<div class="friend elevation-3">
											<v-layout>
												<v-flex xs3>
													<v-avatar size="75px" class="avatar">
														<img :src="friend._from.avatar" :alt="friend._from.login">
													</v-avatar>
												</v-flex>
												<v-flex xs9 class="text">
													<v-btn small icon class="delete" @click.stop="delNotification(friend.id)"><v-icon>delete</v-icon></v-btn>
													<h6>{{ friend._from.login }}</h6>
													<v-btn small primary block @click.stop="acceptFriendRequest(friend.id)" v-t="'friends.accept'"></v-btn>
												</v-flex>
											</v-layout>
										</div>
									</v-flex>
								</v-layout>
							</v-tab-item>
							<v-tab-item id="pending">
								<v-layout row wrap>
									<v-flex v-for="pending in pendingFriendRequests" :key="pending.id" xs6>
										<div class="friend elevation-3">
											<v-layout>
												<v-flex xs3>
													<v-avatar size="75px" class="avatar">
														<img :src="pending.user.avatar" :alt="pending.user.login">
													</v-avatar>
												</v-flex>
												<v-flex xs9 class="text">
													<h6>{{ pending.user.login }}</h6>
													<v-btn small primary block @click.stop="delNotification(pending.id)" v-t="'friends.cancel'"></v-btn>
												</v-flex>
											</v-layout>
										</div>
									</v-flex>
								</v-layout>
							</v-tab-item>
						</v-tabs-items>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
import { VTabsItems, VTabItem } from "vuetify/es5/components/VTabs";
import {
	VIcon,
	VBtn,
	VTextField,
	VDataTable,
	VSelect,
	VChip,
	VAvatar
} from "vuetify/es5/components";
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
	name: "user_friends",
	props: {
		userId: String
	},
	data() {
		return {
			currTab: "friends",
			me: {},
			user: { friends: [] },
			friendRequests: [],
			pendingFriendRequests: [],
			search: "",
			selectedFriends: [],
			searchUser: []
		};
	},
	methods: {
		acceptFriendRequest(id) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation acceptFriendRequest($notif: ID!) {
							acceptFriendRequest(notif: $notif) {
								error
							}
						}
					`,
					variables: {
						notif: id
					}
				})
				.then(() => {
					this.$apollo.queries.friendRequests.refetch();
					this.$apollo.queries.user.refetch();
				});
		},
		removeFriend(id) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation delFriend($friend: ID!) {
							delFriend(friend: $friend)
						}
					`,
					variables: {
						friend: id
					}
				})
				.then(() => this.$apollo.queries.user.refetch());
		},
		delNotification(id) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation delNotification($notif: ID!) {
							delNotification(notif: $notif) {
								error
							}
						}
					`,
					variables: {
						notif: id
					}
				})
				.then(() => this.$apollo.queries.pendingFriendRequests.refetch());
		},
		inviteFriends() {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation sendFriendsRequests($to: [ID!]!) {
							sendFriendsRequests(to: $to)
						}
					`,
					variables: {
						to: this.selectedFriends.map(({ id }) => id)
					}
				})
				.then(() => {
					this.$apollo.queries.pendingFriendRequests.refetch();
					this.searchUser = [];
					this.selectedFriends = [];
				});
		}
	},
	computed: {
		isMe() {
			return this.me && this.user && this.me.id === this.user.id;
		},
		searchResults() {
			const friendsId = this.user.friends.map(({ id }) => id);
			const friendsRequestsId = this.pendingFriendRequests.map(
				({ user }) => user.id
			);
			const selectedFriendsId = this.selectedFriends.map(({ id }) => id);
			const search = this.searchUser.filter(
				({ id }) =>
					!selectedFriendsId.includes(id) &&
					!friendsId.includes(id) &&
					!friendsRequestsId.includes(id) &&
					id !== this.user.id
			);
			return search.concat(this.selectedFriends);
		}
	},
	components: {
		VAvatar,
		VContainer,
		VFlex,
		VLayout,
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VIcon,
		VBtn,
		VTextField,
		VTabsItems,
		VTabItem,
		VDataTable,
		VSelect,
		VChip
	},
	apollo: {
		user: {
			query: gql`
				query userById($id: ID!) {
					userById(id: $id) {
						id
						friends {
							id
							avatar
							login
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
			query() {
				return gql`
					{
						me {
							id
						}
					}
				`;
			},
			update: ({ me }) => me
		},
		friendRequests: {
			query: gql`
				{
					friendRequests {
						id
						_from {
							login
							id
							avatar
						}
					}
				}
			`,
			update: ({ friendRequests }) => friendRequests
		},
		pendingFriendRequests: {
			query: gql`
				{
					pendingFriendRequests {
						id
						user {
							login
							id
							avatar
						}
					}
				}
			`,
			update: ({ pendingFriendRequests }) => pendingFriendRequests
		},
		searchUser: {
			query: gql`
				query($name: String!) {
					searchUser(name: $name) {
						login
						id
					}
				}
			`,
			variables() {
				return {
					name: this.search || ""
				};
			},
			update: ({ searchUser }) => searchUser
		}
	},
	i18n: {
		messages: {
			fr: {
				friends: {
					list: "Liste d'amis",
					invites: "Invitations",
					pending_invites: "Mes invitations",
					search: "Rechercher des amis",
					no_results: "Aucun ami trouvé",
					accept: "Acepter",
					cancel: "Annuler"
				}
			},
			en: {
				friends: {
					list: "Friends List",
					invites: "Friends Invites",
					pending_invites: "My Invites",
					search: "Search firends",
					no_results: "Nothing found",
					accept: "Accept",
					cancel: "Cancel"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";

  .friends-tabs-list {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    background-color: #dcdcdc !important;

    .active {
      background-color: #d0d0d0 !important;
      .list__tile__title {
        color: $main-color !important;
      }
    }
  }

  .friends-tabs > * {
    padding 5px;
  }

  .friend {
    padding: 10px;
    .delete {
      float: right;
      margin: 0 !important;
    }
    .avatar {
      background-color: #454545;
      border: 1px solid #595959 !important;
    }
    .text {
      padding-left 10px !important;
      h6 { padding-top: 2px !important; }
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        margin-bottom: 0;
      }
    }
  }

  .application.theme--dark {
    .friends-tabs-list {
      background-color: #454545 !important;

      .active {
        background-color: #4c4c4c !important;
        .list__tile__title {
          color: $main-color !important;
        }
      }
    }

    .friend {
      background-color: #454545;
    }
  }
</style>
