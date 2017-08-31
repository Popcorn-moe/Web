<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="item">
                <v-list-tile-action>
                    <img class="user-logo" src="https://www.gravatar.com/avatar/71c4dbbed866e68bcb89661bc5fa3017">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>DeltaVevo</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-action>
                    <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Mon compte</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-action>
                    <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Autres</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <li class="text-xs-right user-logout" @click.stop="() => logout()">
                Se deconnecter
            </li>
        </v-list-group>
    </v-list>
</template>

<script>
import Lists from 'vuetify/src/components/lists'
import { mapGetters, mapActions } from 'vuex'
import { VIcon } from '@/vuetify'
import { logout } from '@/utils/auth'

export default {
    components: {
        ...Lists,
        VIcon
    },
    methods: {
        ...mapActions({
            setIsAuth: 'setIsAuth'
        }),
        logout() {
            logout().then(() => this.setIsAuth(false))
        }
    }
}
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .user-logo {
    height: 35px;
  }

  .user-logout {
    padding: 15px;
    color: #4b4b4b !important;
    text-decoration: none;
    cursor: pointer;3
  }
</style>

