<template>
    <v-navigation-drawer
      persistent
      :value="value"
      @input="value => $emit('input', value)"
      class="elevation-2"
      disable-route-watcher
      app
    >
      <div class="nav-content">
        <v-slide-x-transition mode="out-in">
          <notifications @close="notifications = false" @input="value => $emit('input', value)"  v-if="notifications"></notifications>
          <div v-else key="menu" style="">
            <v-layout row wrap class="text-xs-center no-margin">
              <v-flex xs3>
                <v-btn icon @click.stop="$emit('input', !value)">
                  <v-icon>menu</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <object alt="logo" data="/static/logo-animated.svg" type="image/svg+xml"></object>
              </v-flex>
              <v-flex xs3>
                <v-btn icon @click.stop="notifications = !notifications && notifs_count > 0" v-if="isAuth" :disabled="notifs_count == 0">
                  <v-badge overlay v-if="notifs_count > 0">
                    <span slot="badge" v-html="notifs_count"></span>
                    <v-icon>notifications</v-icon>
                  </v-badge>
                  <v-icon v-if="notifs_count == 0">notifications</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

            <auth-menu v-if="isAuth"></auth-menu>
            <v-layout v-else row wrap class="text-xs-center no-margin">
              <v-flex xs6>
                <v-btn outline small :to="{ name: 'Login' }" v-t="'navbar.login'"></v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn outline small class="main-color--text" :to="{ name: 'SignUp' }" v-t="'navbar.signup'"></v-btn>
              </v-flex>
            </v-layout>
            <v-list>
              <v-list-tile
                v-for="(route, i) in routes.filter(r => !r.hide)"
                :key="i"
                :to="route.path"
              >
                <v-list-tile-action>
                  <v-icon v-html="route.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content v-t="route.t"></v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
        </v-slide-x-transition>
      </div>
      <div class="bottom">
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs4 offset-xs1>
            <language-select></language-select>
          </v-flex>
          <v-flex xs4 offset-xs2>
            <v-switch :label="$t('navbar.dark')" :inputValue="darkTheme" @change="setDarkTheme"></v-switch>
          </v-flex>
        </v-layout>
      </div>
    </v-navigation-drawer>
</template>

<script>
import Notifications from "./Notifications";
import AuthMenu from "./AuthMenu";
import LanguageSelect from "./LanguageSelect";
import {
	VNavigationDrawer,
	VBtn,
	VSwitch,
	VIcon,
	VBadge,
	VDivider
} from "vuetify/es5/components";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent
} from "vuetify/es5/components/VList";
import { VSlideXTransition } from "vuetify/es5/components/transitions";
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { logout } from "../../../utils/auth";
import gql from "graphql-tag";

export default {
	props: {
		value: Boolean
	},
	data() {
		return {
			routes,
			notifications: false,
			notifs_count: -1
		};
	},
	apollo: {
		notifs_count: {
			query: gql`
				{
					me {
						id
						notifications {
							id
						}
					}
				}
			`,
			update: ({ me }) => (me && me.notifications.length) || -1
		}
	},
	components: {
		Notifications,
		AuthMenu,
		LanguageSelect,
		VNavigationDrawer,
		VBtn,
		VSwitch,
		VIcon,
		VDivider,
		VSlideXTransition,
		VContainer,
		VFlex,
		VLayout,
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VBadge
	},

	computed: mapGetters({
		darkTheme: "darkTheme",
		isAuth: "isAuth"
	}),

	methods: mapActions({
		setDarkTheme: "setDarkTheme"
	}),
	i18n: {
		messages: {
			fr: {
				navbar: {
					login: "Connexion",
					signup: "Inscription",
					dark: "Foncé"
				}
			},
			en: {
				navbar: {
					login: "Log In",
					signup: "Sign Up",
					dark: "Dark"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .nav-content {
    min-height: calc(100% - 57px) !important;
    overflow-y: auto;
  }
  .navigation-drawer {
    padding-bottom: 0 !important;
  }

  .badge__badge {
    right: -10px !important;
    top: -7px
    width: 18px;
    height: 18px;
    line-height: 18px;
  }

  .bottom {
    bottom: 5px;
    width: 100%;
    .input-group__details {
      min-height: 0px;
    }
    .input-group {
      padding: 9px 0;
    }
  }

  .application--dark {
    .notif-container {
      .content {
        color: #888888 !important;
      }
    }
  }
</style>
