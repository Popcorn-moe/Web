<template>
    <div>
        <v-layout row wrap class="text-xs-center no-margin">
        <v-flex xs3>
            <v-btn icon @click.stop="$emit('input', false)">
              <v-icon>menu</v-icon>
            </v-btn>
        </v-flex>
        <v-flex offset-xs6 xs3>
            <v-btn icon @click.stop="$emit('close')">
              <v-icon>clear</v-icon>
            </v-btn>
        </v-flex>
        </v-layout>
        <v-list>
          <div
              v-for="notif in notifs"
              :key="notif.id"
              to="index"
          >
            <v-layout row>
              <v-flex xs12 class="notif-container">
                <v-layout row>
                  <v-flex xs2>
                    <div v-if="notif.type === 'MESSAGE'"><v-icon>messages</v-icon></div>
                    <div v-if="notif.type === 'FOLLOW'">
                      <v-avatar size="40px" class="notif-img">
                        <img :src="notif.anime.cover" :alt="notif.anime.id">
                      </v-avatar>
                    </div>
                    <div v-if="notif.type === 'FRIEND_REQUEST'">
                      <v-avatar size="40px" class="notif-img">
                        <img :src="notif._from.avatar" :alt="notif._from.login">
                      </v-avatar>
                    </div>
                  </v-flex>
                  <v-flex xs10>
                    <div class="content">
                      <div v-if="notif.type === 'MESSAGE'">{{ notif.message }}</div>
                      <div v-else-if="notif.type === 'FOLLOW'">
                        <div class="content" v-t="{ path: 'notifications.follow', args: { episode: 1, saison: 1, anime: anime.names[0] } }"></div>
                      </div>
                      <div v-else-if="notif.type === 'FRIEND_REQUEST'">
                        <div class="content" v-t="{ path: 'notifications.friends.friend_request', args: { from: notif._from.login } }"></div>
                        <v-btn inline small primary v-t="'notifications.friends.accept'" @click.stop="acceptFriendRequest(notif.id)"></v-btn>
                        <v-btn inline small v-t="'notifications.friends.refuse'" @click.stop="refuseFriendRequest(notif.id)"></v-btn>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </v-list>
    </div>
</template>

<script>
import { VBtn, VIcon, VList, VAvatar } from 'vuetify/es5/components'
import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
import gql from 'graphql-tag'

export default {
    data() {
        return {
            notifs : []
        }
    },
    components: {
        VContainer,
        VFlex,
        VLayout,
        VList,
        VBtn,
        VIcon,
        VAvatar
    },
    apollo: {
      notifs: {
        query: gql`{
                      me {
                        notifications {
                          id
                          type
                          ... on NotifMessageContent { message }
                          ... on NotifFriendRequestContent { _from { id login avatar } }
                          ... on NotifAnimeFollowContent { anime { id names cover} }
                        }
                      }
                   }`,
        update: ({ me }) => me.notifications
      }
    },
    methods: {
      acceptFriendRequest(id) {
        this.$apollo.mutate({
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
        }).then((data) => {
          console.log(data)
          this.$apollo.queries.notifs.refetch()
        });
      },
      refuseFriendRequest(id) {
        this.$apollo.mutate({
          mutation: gql`
            mutation refuseFriendRequest($notif: ID!) {
                refuseFriendRequest(notif: $notif) {
                    error
                }
            }
          `,
          variables: {
            notif: id
          }
        }).then((data) => {
          console.log(data)
          this.$apollo.queries.notifs.refetch()
        });
      }
    },
    i18n: {
      messages: {
        fr: {
          notifications: {
            friends: {
              friend_request: "Vous avez reçu une demande d'amis de {from}",
              accept: "Accepter",
              refuse: "Refuser"
            },
            follow: "L'episode {episode} de la saison {saison} de {anime} viens d'arriver!"
          }
        },
        en: {
          notifications: {
            friends: {
              friend_request: "You have received a friend request from {from}",
              accept: "Accept",
              refuse: "Refuse"
            },
            follow: "Episode {episode} of {season} season {anime} just arrived!"
          }
        }
      }
    }
}
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .notif-container:hover {
    background-color: rgba(0,0,0,0.15);
  }

  .notif-container {
      padding: 6px !important;
      .notif-img {
        padding-left: 10px;
        width: 50px;
        height: auto;
      }

      .content {
        text-align: justify;
        padding-left: 10px;
        padding-right: 10px;
        color: #4b4b4b !important;
      }
  }
</style>
