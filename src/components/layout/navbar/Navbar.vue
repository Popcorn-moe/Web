<template>
    <v-navigation-drawer
      persistent
      :value="value"
      @input="value => $emit('input', value)"
      class="elevation-2"
    >
      <v-slide-x-transition mode="out-in">
        <notifications @close="notifications = false" @input="value => $emit('input', value)"  v-if="notifications"></notifications>
        <div v-else key="menu">
          <v-layout row wrap class="text-xs-center no-margin">
            <v-flex xs3>
              <v-btn icon @click.stop="$emit('input', !value)">
                <v-icon>menu</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <object data="/static/logo-animated.svg" type="image/svg+xml"></object>
            </v-flex>
            <v-flex xs3>
              <v-btn icon @click.stop="notifications = !notifications">
                  <v-icon>notifications</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

          <auth-menu v-if="isAuth"></auth-menu>
          <v-layout v-else row wrap class="text-xs-center no-margin">
            <v-flex xs6>
              <v-btn outline small @click.stop="$router.push('auth/login')">
                Log in
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn outline small class="main-color--text" @click.stop="$router.push('auth/signup')">
                Sign up
              </v-btn>
            </v-flex>
          </v-layout>
          <v-list>
            <router-link
              v-for="(route, i) in routes.filter(r => !r.hide)"
              :key="i"
              :to="route.path"
              class="router-link"
            >
              <v-list-tile activeClass="">
                <v-list-tile-action>
                  <v-icon v-html="route.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{ route.name }}
                </v-list-tile-content>
              </v-list-tile>
            </router-link>
          </v-list>
        </div>
      </v-slide-x-transition>

      <div class="bottom">
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs4 offset-xs4>
            <v-switch label="Dark" :inputValue="darkTheme" @change="setDarkTheme"></v-switch>
          </v-flex>
        </v-layout>
      </div>
    </v-navigation-drawer>
</template>

<script>
import Notifications from './Notifications'
import AuthMenu from './AuthMenu'
import { VNavigationDrawer, VBtn, VSwitch, VIcon, VDivider } from 'vuetify/src/components'
import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent } from 'vuetify/src/components/VList'
import { VSlideXTransition } from 'vuetify/src/components/transitions'
import { mapGetters, mapActions } from 'vuex'
import { routes } from '../../../router'
import { logout } from '../../../utils/auth'

export default {
  props: {
    value: Boolean
  },

  data() {
    return {
        routes,
        notifications: false
    }
  },

  components: {
    Notifications,
    AuthMenu,
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
  },

  computed: mapGetters({
    darkTheme: 'darkTheme',
    isAuth: 'isAuth'
  }),

  methods: mapActions({
    setDarkTheme: 'setDarkTheme'
  })
}
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .bottom {
    position: absolute;
    bottom: 0;
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

  .router-link {
    text-decoration: none;
    &.router-link-exact-active * {
      color: $main-color !important;
    }
  }
</style>
