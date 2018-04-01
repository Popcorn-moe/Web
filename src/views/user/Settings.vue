<template>
  <v-container fluid class="settings-page">
    <v-btn
        v-if="$vuetify.breakpoint.xs && $route.name !== 'UserSettings'"
        absolute
        fab
        small
        color="primary"
        class="ma-2"
        style="z-index: 3"
        @click.stop="$router.go(-1)"
    >
        <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-layout row wrap fill-height>
        <v-flex sm2 v-if="$vuetify.breakpoint.smAndUp || $route.name === 'UserSettings'">
            <v-list dense class="settings-nav elevation-2">
                <v-subheader>User Settings</v-subheader>
                <v-list-tile
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
                </v-list-tile>
                <v-divider v-if="route.divider"></v-divider>
            </v-list>
        </v-flex>
        <v-flex sm10 xs12 v-if="$vuetify.breakpoint.smAndUp || $route.name !== 'UserSettings'">
            <router-view></router-view>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { VIcon, VBtn, VSubheader, VDivider } from "vuetify";
import {
	VList,
	VListTile,
	VListTileTitle,
	VListTileAvatar,
	VListTileContent
} from "vuetify/es5/components/VList";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import gql from "graphql-tag";
import { routes } from "../../router";

export default {
	data() {
		return {
			route: routes.find(({ name }) => name == "UserSettings")
		};
	},
	components: {
		VIcon,
		VBtn,
		VSubheader,
		VDivider,
		VList,
		VListTile,
		VListTileTitle,
		VListTileAvatar,
		VListTileContent,
		VContainer,
		VFlex,
		VLayout
	}
};
</script>

<style lang="stylus">
    @import '../../stylus/main.styl'

    .settings-page {
        height: 100%;

        .settings-nav {
            height: 100%;
        }
    }
</style>
