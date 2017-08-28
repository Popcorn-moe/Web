<template>
    <v-navigation-drawer
      persistent
      :value="value"
      @input="value => $emit('input', value)"
      enable-resize-watcher
      class="elevation-2"
    >
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
          <v-btn icon>
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
import { mapGetters, mapActions } from 'vuex'
import { routes } from '../../router'

export default {
  props: {
    value: Boolean
  },

  data() {
    return {
        routes
    }
  },

  components: {
    VNavigationDrawer,
    VBtn,
    VSwitch,
    VIcon,
    VDivider,
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
  @import '../../stylus/main'

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

  .router-link {
    text-decoration: none;
    &.router-link-exact-active * {
      color: main-color;
    }
  }
</style>
