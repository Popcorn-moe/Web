<template>
    <v-container>
      <v-layout>
        <v-flex xs3>
          <v-list class="library-list">
            <template v-for="playlist in me.playlists.filter(p => p.type !== 'NORMAL')">
              <v-list-tile :key="playlist.name" @click="">
                <v-list-tile-content>
                  <v-list-tile-title v-html="playlist.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-group v-if="me.playlists.filter(p => p.type === 'NORMAL').length > 0">
              <v-list-tile slot="item">
                <v-list-tile-content>
                  <v-list-tile-title>Playlists</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-for="playlist in me.playlists.filter(p => p.type === 'NORMAL')" :key="playlist.name" @click="">
                <v-list-tile-content>
                  <v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-flex>
        <v-flex xs9>
          <div class="library-toolbar">
            <v-btn small flat>
              Supprimer
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn small flat>
              Deplacer
              <v-icon>open_with</v-icon>
            </v-btn>
            <v-btn small flat>
              Tout Selectioner
              <v-icon>playlist_add_check</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script>
import { VIcon, VBtn } from 'vuetify/es5/components'
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/es5/components/VList'
import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
import gql from 'graphql-tag'

export default {
  name: "user_library",
  data() {
    return {
      me: {},
    }
  },
  components: {
    VContainer,
    VFlex,
    VLayout,
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle,
    VIcon,
    VBtn
  },
  apollo: {
    me: {
      query: gql`{ me { playlists {name type} } }`,
      update: ({ me }) => me
    }
  },
}
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";

  .library-list {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    background-color: #dcdcdc !important;
  }

  .library-toolbar {
    margin-left: 10px;
    background-color: #dcdcdc !important;

    .icon {
      padding-left: 5px;
    }
  }

  .application--dark {
    .library-list {
      background-color: #454545 !important;
    }

    .library-toolbar {
      background-color: #454545 !important;
    }
  }


  .router-link {
    text-decoration: none;
  }
</style>
