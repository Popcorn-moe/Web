<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="item">
                <v-list-tile-action>
                    <img class="user-logo" :src="me.avatar">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ me.login }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <router-link :to="{ name: 'User', params: { page: 'profile' }}" class="router-link">
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>face</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Profile</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </router-link>
            <router-link :to="{ name: 'User', params: { page: 'library' }}" class="router-link">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>local_library</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Librairie</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </router-link>
            <router-link :to="{ name: 'User', params: { page: 'settings' }}" class="router-link">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </router-link>
            <li class="text-xs-right user-logout" @click.stop="logout()">
                Se deconnecter
            </li>
        </v-list-group>
    </v-list>
</template>

<script>
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/src/components/VList'
import { mapGetters, mapActions } from 'vuex'
import { VIcon } from 'vuetify/src/components'
import { logout } from '@/utils/auth'
import gql from 'graphql-tag'

export default {
    data() {
        return {
            me: {}
        }
    },
    components: {
        VList,
        VListGroup,
        VListTile,
        VListTileAction,
        VListTileContent,
        VListTileTitle,
        VIcon
    },
    methods: {
        ...mapActions({
            setIsAuth: 'setIsAuth'
        }),
        logout() {
            logout().then(() => this.setIsAuth(false))
        }
    },
    apollo: {
        me: {
            query: gql`{ me { avatar, login } }`,
            update: ({ me }) => me
        }
    },
}
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .user-logo {
    height: 35px;
    border-radius: 50%;
  }

  .user-logout {
    padding: 15px;
    color: #4b4b4b !important;
    text-decoration: none;
    cursor: pointer;3
  }

  .router-link {
    text-decoration: none;
    &.router-link-exact-active * {
      color: $main-color;
    }
  }
</style>

