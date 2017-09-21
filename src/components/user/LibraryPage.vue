<template>
    <v-container>
      <v-layout>
        <v-flex xs3>
          <v-list class="library-list">
            <template v-for="playlist in playlists.filter(p => p.type !== 'NORMAL')">
              <v-list-tile :key="playlist.name" @click="">
                <v-list-tile-content>
                  <v-list-tile-title v-html="playlist.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-group>
              <v-list-tile slot="item">
                <v-list-tile-content>
                  <v-list-tile-title>Playlists</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-for="playlist in playlists.filter(p => p.type === 'NORMAL')" :key="playlist.name" @click="">
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
import { VIcon, VBtn } from 'vuetify/src/components'
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/src/components/VList'
import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'
export default {
  name: "user_library",
  data() {
    return {
      playlists: [
        {
          name: "Historique",
          type: "HISTORY",
          medias: []
        },
        {
          name: "Abonnements",
          type: "FOLLOWS",
          medias: []
        },
        {
          name: "Playlist #1",
          type: "NORMAL",
          medias: []
        },
        {
          name: "Playlist #2",
          type: "NORMAL",
          medias: []
        },
        {
          name: "Playlist #3",
          type: "NORMAL",
          medias: []
        },
        {
          name: "Playlist #4",
          type: "NORMAL",
          medias: []
        }
      ]
    }
  },
  components:
  {
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
  }
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
