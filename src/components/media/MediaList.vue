<template>
  <v-list class="media-list">
    <v-list-group v-for="(season, si) in seasons" :value="season.active" :key="season.name">
      <v-list-tile slot="item">
        <v-list-tile-content>
          <v-list-tile-title>{{ season.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <router-link
        v-for="(ep, ei) in season.episodes"
        :key="ep.name"
        :to="{ name: 'Episode', params: { name: anime, season: si + 1, episode: ei + 1 }}"
        class="router-link"
      >
        <v-list-tile>
          <v-list-tile-title>
            <v-list-tile-title>{{ ep.name }}</v-list-tile-title>
          </v-list-tile-title>
        </v-list-tile>
      </router-link>
    </v-list-group>
  </v-list>
</template>

<script>
import { VIcon } from 'vuetify/src/components'
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/src/components/VList'

export default {
  props: ['anime'],
  data () {
    const seasons = [];
    for (let i = 0; i < 5; i++) {
      seasons.push(
        {
          active: i == 0,
          name: "Saison " + (i + 1),
          episodes: [
            {
              name: "Episode 1"
            },
            {
              name: "Episode 2"
            },
            {
              name: "Episode 3"
            }
          ]
        }
      )
    }
    return {
      seasons
    }
  },
  components: {
    VIcon,
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .media-list {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 10px;
    background-color: #dcdcdc !important;
  }

  .application--dark {
    .media-list {
      background-color: #454545 !important;
    }
  }


  .router-link {
    text-decoration: none;
  }
</style>
