<template>
    <div>
      <div class="user-page-banner"></div>
      <v-tabs class="user-tabs" :value="page" @input="value => this.$router.push({ name: $route.name, params: Object.assign({}, $route.params, { page: value })})">
        <v-layout>
          <v-flex offset-xs1 xs2>
            <img class="user-cover elevation-4" :src="user.avatar">
          </v-flex>
          <v-flex xs9>
            <div class="user-top-nav">
              <v-tabs-bar>
                <v-tabs-item activeClass="active" href="#profile" >{{ $t('user_page.profile') }}</v-tabs-item>
                <v-tabs-item activeClass="active" href="#library" >{{ $t('user_page.library') }}</v-tabs-item>
                <v-tabs-item activeClass="active" href="#friends" >{{ $t('user_page.friends') }}</v-tabs-item>
                <v-tabs-item activeClass="active" href="#settings" class="right" v-if="isMe()">{{ $t('user_page.settings') }}</v-tabs-item>
              </v-tabs-bar>
            </div>
          </v-flex>
        </v-layout>
        <v-container fluid>
          <div class="tabs__items">
            <v-tabs-content lazy id="profile">
              <user-profile :userId="user.id"></user-profile>
            </v-tabs-content>
            <v-tabs-content lazy id="library">
              <!--<user-library></user-library>-->
            </v-tabs-content>
            <v-tabs-content lazy id="friends">
              <user-friends :userId="user.id"></user-friends>
            </v-tabs-content>
            <v-tabs-content lazy id="settings" v-if="isMe()">
              <user-settings></user-settings>
            </v-tabs-content>
          </div>
        </v-container>
      </v-tabs>
    </div>
</template>

<script>
import UserSettings from './SettingsPage.vue'
import UserLibrary from './LibraryPage.vue'
import UserFriends from './FriendsPage.vue'
import UserProfile from './ProfilePage.vue'

import VTabs from 'vuetify/es5/components/VTabs'
import VTabsBar from 'vuetify/es5/components/VTabs/VTabsBar'
import VTabsContent from 'vuetify/es5/components/VTabs/VTabsContent'
import VTabsItem from 'vuetify/es5/components/VTabs/VTabsItem'
import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
import gql from 'graphql-tag'

export default
{
  name: 'user-page',
  props: ['page', 'userLogin'],
  data() {
      return {
        user: {},
        me: {}
      }
  },
  components: {
    VTabs,
    VTabsBar,
    VTabsContent,
    VTabsItem,
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
      return this.user.id === this.me.id
    }
  },
  apollo: {
    me: {
      query: gql`{ me { id } }`,
      update: ({ me }) => me
    },
    user: {
      query() {
        return !this.userLogin
          ? gql`{ me { id avatar } }`
          : gql`
              query user($name: String!) {
                user(name: $name) { id avatar }
              }`;
      },
      variables() {
        return {
          name: this.userLogin ? this.userLogin : ''
        }
      },
      update({ me, user }) {
        if(!me && !user)
          this.$router.replace({ name: 'Login' });
        else return user ? user : me;
      }
    }
  },
  i18n: {
    messages: {
      fr: {
        user_page: {
          profile: 'Profil',
          library: 'Librairie',
          friends: 'Amis',
          settings: 'Paramètres'
        }
      },
      en: {
        user_page: {
          profile: 'Profile',
          library: 'Library',
          friends: 'Friends',
          settings: 'Settings'
        }
      }
    }
  }
}
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

  .user-tabs {
    overflow: visible !important;
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
