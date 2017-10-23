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
        <router-link
            v-for="notif in notifs"
            :key="notif.id"
            to="index"
            class="router-link"
        >
            <v-layout row>
            <v-flex xs12 class="notif-container">
                <v-layout row>
                <v-flex xs2>
                  <div v-if="notif.type === 'MESSAGE'"><v-icon>messages</v-icon></div>
                  <div v-if="notif.type === 'FOLLOW'"><v-icon>equalizer</v-icon></div>
                  <div v-if="notif.type === 'FRIEND_REQUEST'"><v-icon>face</v-icon></div>
                </v-flex>
                <v-flex xs10>
                    <div class="content">
                      <div v-if="notif.type === 'MESSAGE'">{{ notif.message }}</div>
                      <div v-else-if="notif.type === 'FOLLOW'">{{ notif.anime.id }}</div>
                      <div v-else-if="notif.type === 'FRIEND_REQUEST'">

                      </div>
                    </div>
                </v-flex>
                </v-layout>
            </v-flex>
            </v-layout>
        </router-link>
        </v-list>
    </div>
</template>

<script>
import { VBtn, VIcon, VList } from 'vuetify/es5/components'
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
        VIcon
    },
    apollo: {
      notifs: {
        query: gql`{
                      me {
                        notifications {
                          id
                          type
                          ... on NotifMessageContent { message }
                          ... on NotifFriendRequestContent { _from { id } }
                          ... on NotifFollowContent { anime { id } }
                        }
                      }
                   }`,
        update: (data) => {
          console.log(data);
          return data.me.notifications
        },
        result(result) {
          console.log('Results', result)
        },
        error(result) {
          console.log('Error', result)
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
      .img {
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
