<template>
    <v-list>
        <v-list-group v-if="me">
            <v-list-tile slot="activator">
                <v-list-tile-action>
                    <img class="user-logo" :src="me.avatar">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ me.login }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <auth-menu-links :login="me.login"></auth-menu-links>
        </v-list-group>
    </v-list>
</template>

<script>
import {
	VList,
	VListGroup,
	VListTile,
	VListTileTitle,
	VListTileAction,
	VListTileContent
} from "vuetify/es5/components/VList";
import AuthMenuLinks from "./AuthMenuLinks";
import gql from "graphql-tag";

export default {
	data() {
		return {
			me: null
		};
	},
	components: {
		VList,
		VListGroup,
		VListTile,
		VListTileTitle,
		VListTileAction,
		VListTileContent,
		AuthMenuLinks
	},
	apollo: {
		me: {
			query: gql`
				{
					me {
						id
						avatar
						login
					}
				}
			`,
			update: ({ me }) => me,
			fetchPolicy: "network-only"
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
</style>
