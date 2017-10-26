<template>
  <v-container grid-list-md>
    <v-layout class="text-xs-center">
      <v-flex offset-xs2 xs8>
        <v-select
          label="Search Friends"
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
          no-data-text="Nothing found"
        ></v-select>
      </v-flex>
      <v-flex xs1>
        <v-btn fab dark small color="primary">
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-tabs class="friends-tabs">
      <v-layout>
        <v-flex xs3>
          <v-list class="friends-tabs-list elevation-3">
            <v-list-tile @click.stop="currTab = 'friends'" :class="{'active': currTab === 'friends'}">
              <v-list-tile-content>
                <v-list-tile-title>Friends List</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click.stop="currTab = 'invites'" :class="{'active': currTab === 'invites'}">
              <v-list-tile-content>
                <v-list-tile-title>Friends Invites</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click.stop="currTab = 'pending'" :class="{'active': currTab === 'pending'}">
              <v-list-tile-content>
                <v-list-tile-title>Pending invites</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs9>
          <v-layout>
            <v-flex xs12>
              <v-tabs class="friends-tabs" :value="currTab">
                <div class="tabs__items">
                  <v-tabs-content lazy id="friends">
                    <v-layout row wrap>
                      <v-flex v-for="friend in me.friends" :key="friend.id" xs6>
                        <div class="friend elevation-3">
                          <v-layout>
                            <v-flex xs3>
                              <v-avatar size="75px" class="avatar">
                                <img :src="friend.avatar" :alt="friend.login">
                              </v-avatar>
                            </v-flex>
                            <v-flex xs9 class="text">
                              <v-btn small icon style="float: right; margin: 0 !important;"><v-icon>delete</v-icon></v-btn>
                              <h6>{{ friend.login }}</h6>
                              <div>{{ "STATUS" }}</div>
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-tabs-content>
                  <v-tabs-content lazy id="invites">
                    <v-layout row wrap>
                      <v-flex v-for="friend in friendRequests" :key="friend.id" xs6>
                        <div class="friend elevation-3">
                          <v-layout>
                            <v-flex xs3>
                              <v-avatar size="75px" class="avatar">
                                <img :src="friend.avatar" :alt="friend.login">
                              </v-avatar>
                            </v-flex>
                            <v-flex xs9 class="text">
                              <v-btn small icon style="float: right; margin: 0 !important;"><v-icon>delete</v-icon></v-btn>
                              <h6>{{ friend.login }}</h6>
                              <v-btn small primary block>
                                ACCEPTER
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-tabs-content>
                  <v-tabs-content lazy id="pending">
                    <v-layout row wrap>
                      <v-flex v-for="friend in pendingFriendRequests" :key="friend.id" xs6>
                        <div class="friend elevation-3">
                          <v-layout>
                            <v-flex xs3>
                              <v-avatar size="75px" class="avatar">
                                <img :src="friend.avatar" :alt="friend.login">
                              </v-avatar>
                            </v-flex>
                            <v-flex xs9 class="text">
                              <h6>{{ friend.login }}</h6>
                              <v-btn small primary block>
                                ANNULER
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-tabs-content>
                </div>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-tabs>
  </v-container>
</template>

<script>
import VTabs from 'vuetify/es5/components/VTabs'
import VTabsContent from 'vuetify/es5/components/VTabs/VTabsContent'
import VTabsItem from 'vuetify/es5/components/VTabs/VTabsItem'
import { VIcon, VBtn, VTextField, VDataTable, VSelect, VChip, VAvatar } from 'vuetify/es5/components'
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/es5/components/VList'
import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
import gql from 'graphql-tag'

export default {
  name: "user_friends",
  data() {
    return {
      currTab: "friends",
      me: { friends: [] },
      friendRequests: [],
      pendingFriendRequests: [],
      search: '',
      selectedFriends: [],
      searchUser: []
    }
  },
  methods: {
  },
  computed: {
    searchResults() {
      const friendsId = this.me.friends.map(({ id }) => id)
      const selectedFriendsId = this.selectedFriends.map(({ id }) => id)
      const search = this.searchUser.filter(({ id }) => !selectedFriendsId.includes(id) && !friendsId.includes(id) )
      return search.concat(this.selectedFriends)
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
    VTabs,
    VTabsContent,
    VTabsItem,
    VDataTable,
    VSelect,
    VChip
  },
  apollo: {
    me: {
      query: gql`{ me { friends { id login avatar } } }`,
      update: ({ me }) => me
    },
    friendRequests: {
      query: gql`{ friendRequests { login id avatar } }`,
      update: ({ friendRequests }) => friendRequests
    },
    pendingFriendRequests: {
      query: gql`{ pendingFriendRequests { login id avatar } }`,
      update: ({ pendingFriendRequests }) => pendingFriendRequests
    },
    searchUser: {
      query: gql`query ($name: String!) {
        searchUser(name: $name) {
          login id
        }
      }`,
      variables() {
        console.log(this.search)
        return {
          name: this.search || ''
        }
      },
      update: ({ searchUser }) => searchUser
    }
  }
}
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

  .friends-tabs {
    .tabs__items {
      padding 5px;
    }

    .friend {
      padding: 10px;
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
  }

  .application--dark {
    .friends-tabs-list {
      background-color: #454545 !important;

      .active {
        background-color: #4c4c4c !important;
        .list__tile__title {
          color: $main-color !important;
        }
      }
    }

    .friends-tabs {
      .friend {
        background-color: #454545;
      }
    }
  }
</style>
