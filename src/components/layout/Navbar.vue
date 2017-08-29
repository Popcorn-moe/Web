<template>
    <v-navigation-drawer
      persistent
      :value="value"
      @input="value => $emit('input', value)"
      enable-resize-watcher
      class="elevation-2"
    >
      <v-slide-x-transition mode="out-in">
        <div v-if="notifications" key="notifications">
          <v-layout row wrap class="text-xs-center no-margin">
            <v-flex xs3>
              <v-btn icon @click.stop="$emit('input', !value)">
                <v-icon>menu</v-icon>
              </v-btn>
            </v-flex>
            <v-flex offset-xs6 xs3>
              <v-btn icon @click.stop="notifications = !notifications">
                <v-icon>clear</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-list>
            <router-link
              v-for="notif in notifs"
              :key="notif.id"
              to="index"
              class="router-link"
            >
              <v-layout row>
                <v-flex xs12 class="notif-container">
                  <v-layout row>
                    <v-flex xs2>
                      <img v-bind:src="notif.cover" class="img"></v-list-tile-avatar>
                    </v-flex>
                    <v-flex xs10>
                      <div class="content">{{ notif.content }}</div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </router-link>
          </v-list>
        </div>
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

          <v-layout row wrap class="text-xs-center no-margin">
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
              <v-list-tile value="true">
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
import { VNavigationDrawer, VBtn, VSwitch, VIcon, VDivider } from '@/vuetify'
import Grid from 'vuetify/src/components/grid'
import Lists from 'vuetify/src/components/lists'
import { VSlideXTransition } from 'vuetify/src/components/transitions'
import { mapGetters, mapActions } from 'vuex'
import { routes } from '../../router'

export default {
  props: {
    value: Boolean
  },

  data() {
    return {
        routes,
        notifications: false,
        notifs : [
          {
            id: "index",
            cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
            content: "Tel anime de merde est sorti zdzqdzq dz dqzd zd qzdzqdqz qzd qzdqzd qzd qzd zqdzqd qzd qzd qzdqzdqzdqzd qdqz dqzd"
          },
          {
            id: "index",
            cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
            content: "Tel anime de merde est sorti"
          },
          {
            id: "index",
            cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
            content: "Tel anime de merde est sorti"
          },
          {
            id: "index",
            cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
            content: "Tel anime de merde est sorti"
          }
        ]
    }
  },

  components: {
    VNavigationDrawer,
    VBtn,
    VSwitch,
    VIcon,
    VDivider,
    VSlideXTransition,
    ...Grid,
    ...Lists,
  },

  computed: mapGetters({
    darkTheme: 'darkTheme',
  }),

  methods: mapActions({
    setDarkTheme: 'setDarkTheme'
  })
}
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

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

  .notif-container:hover {
    background-color: rgba(0,0,0,0.15);
  }

  .notif-container {
      padding: 6px !important;
      .img {
        padding-left: 10px;
        width: 50px;
        height: auto;
      }
      .content {
        text-align: justify;
        padding-left: 10px;
        padding-right: 10px;
        color: #4b4b4b !important;
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
      color: $main-color;
    }
  }
</style>
