<template>
    <div>
      <div class="user-page-banner"></div>
      <v-layout>
        <v-flex offset-xs1 xs2>
          <img class="user-cover elevation-4" :src="user.avatar">
        </v-flex>
        <v-flex xs9>
          <v-tabs class="user-top-nav" :value="page" @input="value => this.$router.push({ name: $route.name, params: Object.assign({}, $route.params, { page: value })})">
            <v-tab activeClass="active" href="#profile" >{{ $t('route.auth.profile') }}</v-tab>
            <v-tab activeClass="active" href="#library" >{{ $t('route.auth.library') }}</v-tab>
            <v-tab activeClass="active" href="#friends" >{{ $t('route.auth.friends') }}</v-tab>
            <v-tab activeClass="active" href="#settings" class="right" v-if="isMe()">{{ $t('route.auth.settings') }}</v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <v-container fluid>
        <v-tabs-items :value="page">
          <v-tab-item id="profile">
            <user-profile :userId="user.id"></user-profile>
          </v-tab-item>
          <v-tab-item id="library">
            <!--<user-library></user-library>-->
          </v-tab-item>
          <v-tab-item id="friends">
            <user-friends :userId="user.id"></user-friends>
          </v-tab-item>
          <v-tab-item id="settings" v-if="isMe()">
            <user-settings></user-settings>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </div>
</template>

<script>
import UserSettings from "./SettingsPage.vue";
import UserLibrary from "./LibraryPage.vue";
import UserFriends from "./FriendsPage.vue";
import UserProfile from "./ProfilePage.vue";

import {
	VTabs,
	VTab,
	VTabsItems,
	VTabItem
} from "vuetify/es5/components/VTabs";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import gql from "graphql-tag";

export default {
	name: "user-page",
	props: ["page", "userLogin"],
	data() {
		return {
			user: {},
			me: {}
		};
	},
	components: {
		VTabs,
		VTab,
		VTabItem,
		VTabsItems,
		VContainer,
		VFlex,
		VLayout,
		UserLibrary,
		UserSettings,
		UserFriends,
		UserProfile
	},
	methods: {
		isMe() {
			return this.user.id === this.me.id;
		}
	},
	apollo: {
		me: {
			query: gql`
				{
					me {
						id
					}
				}
			`,
			update: ({ me }) => me
		},
		user: {
			query() {
				return !this.userLogin
					? gql`
							{
								me {
									id
									avatar
								}
							}
						`
					: gql`
							query user($name: String!) {
								user(name: $name) {
									id
									avatar
								}
							}
						`;
			},
			variables() {
				return {
					name: this.userLogin ? this.userLogin : ""
				};
			},
			update({ me, user }) {
				if (!me && !user) this.$router.replace({ name: "Login" });
				else return user ? user : me;
			}
		}
	}
};
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";

  .user-page-banner {
    width: 100%;
    height: 300px;
    background: black url(https://images6.alphacoders.com/505/thumb-1920-505441.jpg) center;
    -moz-box-shadow: inset 0 -50px 75px 0px #000000;
    -webkit-box-shadow: inset 0 -50px 75px 0px #000000;
    box-shadow: inset 0 -50px 60px -35px #000000;
  }

  .user-cover {
    width: 100%;
    height: auto;
    margin-top: -55%;
    border: 4px solid white;
    border-radius: 3px;
    float: left;
  }

  .user-top-nav
  {
    transform: translateY(-100%);

    a {
      color: white !important;
    }

    .tabs__bar {
      background-color: transparent;
    }

    .tabs__wrapper {
      margin: 0 10px !important;
    }

    .right {
      margin-left: auto;
    }

    .active {
      color: white !important;
      font-weight bold;
      background: linear-gradient(transparent, $main-color);
    }
  }

  .application--dark {
    .user-page-banner {
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .user-cover {
      border-color: $grey.darken-3;
    }
  }
</style>
