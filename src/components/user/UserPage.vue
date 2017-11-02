<template>
    <div>
      <div class="user-page-banner"></div>
      <v-tabs class="user-tabs" :value="page" @input="value => this.$router.push({ name: 'User', params: { page: value }})">
        <v-layout>
          <v-flex offset-xs1 xs2>
            <img class="user-cover elevation-4" :src="me.avatar">
          </v-flex>
          <v-flex xs9>
            <div class="user-top-nav">
              <v-tabs-bar>
                <v-tabs-item activeClass="active" href="#profile">Profile</v-tabs-item>
                <v-tabs-item activeClass="active" href="#library">Library</v-tabs-item>
                <v-tabs-item activeClass="active" href="#friends">Friends</v-tabs-item>
                <v-tabs-item activeClass="active" href="#settings" class="right">Settings</v-tabs-item>
              </v-tabs-bar>
            </div>
          </v-flex>
        </v-layout>
        <v-container>
          <div class="tabs__items">
            <v-tabs-content lazy id="profile">
              <user-profile></user-profile>
            </v-tabs-content>
            <v-tabs-content lazy id="library">
              <user-library></user-library>
            </v-tabs-content>
            <v-tabs-content lazy id="friends">
              <user-friends></user-friends>
            </v-tabs-content>
            <v-tabs-content lazy id="settings">
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
  props: ['page'],
  data() {
      return {
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
  apollo: {
    me: {
      query: gql`{ me { avatar } }`,
      update({ me }) {
        if(!me)
          this.$router.replace({ name: 'Login' });
        else return me;
      }
    }
  },
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
