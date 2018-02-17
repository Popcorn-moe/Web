<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="activator">
                <v-list-tile-action>
                    <img class="user-logo" :src="me.avatar">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ me.login }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'User', params: { page: 'profile' }}">
                <v-list-tile-action>
                    <v-icon>face</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-t="'route.auth.profile'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'User', params: { page: 'library' }}">
                <v-list-tile-action>
                    <v-icon>local_library</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-t="'route.auth.library'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'User', params: { page: 'friends' }}">
              <v-list-tile-action>
                <v-icon>group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-t="'route.auth.friends'"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'User', params: { page: 'settings' }}">
                <v-list-tile-action>
                    <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-t="'route.auth.settings'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <li class="text-xs-right user-logout" @click.stop="logout()" v-t="'route.auth.logout'"></li>
        </v-list-group>
    </v-list>
</template>

<script>
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import { mapGetters, mapActions } from "vuex";
import { VIcon } from "vuetify/es5/components";
import { logout } from "@/utils/auth";
import gql from "graphql-tag";

export default {
	data() {
		return {
			me: {}
		};
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
			setIsAuth: "setIsAuth"
		}),
		logout() {
			logout().then(() => this.setIsAuth(false));
		}
	},
	apollo: {
		me: {
			query: gql`
				{
					me {
						avatar
						login
					}
				}
			`,
			update: ({ me }) => me
		}
	}
};
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
</style>
