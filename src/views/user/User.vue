<template>
    <div class="user-page">
      <div class="user-page-banner px-2">
        <div class="user-container">
          <img class="user-cover" :src="user.avatar">
          <div class="user-data text-xs-center">
            <span class="login">{{ user.login }}</span>
            <v-btn class="primary follow text--primary" :outline="user.isFollower" v-if="!isMe" @click.stop="toggleFollow">{{ user.isFollower ? "Unfollow" : "Follow"}}</v-btn>
          </div>
        </div>
        <div class="user-top-nav">
          <v-tabs :value="page" @input="changeUrl">
            <v-tab activeClass="active" href="#profile" >{{ $t('route.auth.profile') }}</v-tab>
            <v-tab activeClass="active" href="#library" >{{ $t('route.auth.library') }}</v-tab>
            <v-tab activeClass="active" href="#follows" >{{ $t('route.auth.follows') }}</v-tab>
            <v-tab activeClass="active" href="#followers" >{{ $t('route.auth.followers') }}</v-tab>
            <v-tab activeClass="active" href="#settings" class="right" v-if="isMe">{{ $t('route.auth.settings') }}</v-tab>
          </v-tabs>
        </div>
      </div>
      <v-tabs-items :value="page">
        <v-tab-item id="profile">
            <user-profile :userId="user.id"></user-profile>
          </v-tab-item>
          <v-tab-item id="library">
            <!--<user-library></user-library>-->
          </v-tab-item>
          <v-tab-item id="follows">
            <user-follows :userId="user.id"></user-follows>
          </v-tab-item>
          <v-tab-item id="followers">
            <user-followers :userId="user.id"></user-followers>
          </v-tab-item>
          <v-tab-item id="settings" v-if="isMe">
            <user-settings></user-settings>
          </v-tab-item>
      </v-tabs-items>
    </div>
</template>

<script>
import UserSettings from "./Settings";
import UserLibrary from "./Library";
import UserFollows from "./Follows";
import UserFollowers from "./Followers";
import UserProfile from "./Profile";
import clone from "clone";

import {
	VTabs,
	VTab,
	VTabsItems,
	VTabItem
} from "vuetify/es5/components/VTabs";
import { VBtn } from "vuetify";
import gql from "graphql-tag";

export default {
	name: "user-page",
	props: ["page", "userLogin"],
	data() {
		return {
			user: {},
			me: null
		};
	},
	components: {
		VTabs,
		VTab,
		VTabItem,
		VTabsItems,
		UserLibrary,
		UserSettings,
		UserFollows,
		UserFollowers,
		UserProfile,
		VBtn
	},
	methods: {
		changeUrl(value) {
			this.$router.push({
				name: value === "settings" ? "UserSettings" : "User",
				params: Object.assign({}, this.$route.params, {
					page: value
				})
			});
		},
		goto404() {
			this.$router.replace({ name: "404" });
		},
		toggleFollow() {
			this.$apollo
				.mutate({
					mutation: gql`
          mutation toggleFollow($id: ID!) {
            ${this.user.isFollower ? "unfollow" : "follow"}(id: $id)
          }
        `,
					variables: {
						id: this.user.id
					}
				})
				.then(({ data: { follow, unfollow } }) => {
					this.user.isFollower = !unfollow || follow;
				});
		}
	},
	computed: {
		isMe() {
			return this.me && this.user && this.me.id === this.user.id;
		}
	},
	apollo: {
		user: {
			query: gql`
				query user($name: String!, $me: ID!) {
					user(name: $name) {
						id
						avatar
						login
						isFollower(id: $me)
					}
				}
			`,
			variables() {
				return {
					name: this.userLogin,
					me: this.me.id
				};
			},
			skip() {
				return !this.userLogin || !this.me;
			},
			update: ({ user }) => clone(user)
		},
		me: {
			query: gql`
				{
					me {
						id
					}
				}
			`,
			update: ({ me }) => me
		}
	},
	watch: {
		user(newUser) {
			if (!newUser) this.goto404();
		}
	}
};
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";

  $profilePic = 150px;
  $bannerHeight = 300px;

  .user-page {
    height: 100%;

    .user-page-banner {
      width: 100%;
      height: $bannerHeight;
      background: black url(https://images6.alphacoders.com/505/thumb-1920-505441.jpg) center;
      box-shadow: inset 0 -50px 60px -35px #000000;
      position: relative;

      .user-container {
        position: relative;
        left: "calc(12.5% - %s)" % ($profilePic / 2);
        padding-top: ($profilePic / 2);

        .user-cover {
          display: inline-block;
          float: left;
          width: $profilePic;
          height: $profilePic;
          border-radius: 100%;
        }

        .user-data {
          display: inline-block;
          font-size: 25px;
          padding-left: 20px;
          padding-top: ($profilePic / 2 - 25px)
          width: 150px;

          .follow {
            margin: 0 !important;
          }
        }
      }

      .user-top-nav {
        position: absolute;
        bottom: 0;
        width: 100%;

        & > .tabs {
          width: 100%;
        }

        a {
          color: white !important;
        }

        .tabs__bar {
          background-color: transparent !important;
        }

        .tabs__wrapper {
          margin: 0 10px !important;
        }

        .right {
          margin-left: auto;
        }

        .active {
          color: white !important;
          font-weight: bold;
          background: linear-gradient(transparent, $main-color);
        }
      }
    }

    .tabs__items {
      height: "calc(100% - %s)" % $bannerHeight;
      .tabs__content {
        height: 100%;
      }
    }

    @media (max-width: 600px) {
      .user-page-banner {
        height: 400px;
        padding-left: 0;

        .user-container {
          width: 150px;
          left: "calc(50%  - %s)" % ($profilePic / 2);
          display: block;
          margin: 0;

          .user-cover {
            float none;
          }

          .user-data {
            width: 100%;
            padding-top: 0;
            padding-left: 0;
            display: block;
            .follow {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .application.theme--dark .user-page {
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
