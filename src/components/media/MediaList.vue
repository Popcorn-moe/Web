<template>
  <v-list class="media-list">
    <v-list-group v-for="(season, si) in seasons" :value="season.active" :key="season.name">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>{{ season.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="(ep, ei) in season.episodes"
        :key="ep.name"
        :to="{ name: 'Episode', params: { id: anime, season: si + 1, episode: ei + 1 }}"
      >
        <v-list-tile-title>
          <v-list-tile-title>{{ ep.name }}</v-list-tile-title>
        </v-list-tile-title>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
import { VIcon } from 'vuetify/es5/components'
import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/es5/components/VList'

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
  }

  .application.theme--dark {
    .media-list {
      background-color: #454545 !important;
    }
  }

  .application.theme--light {
    .media-list {
      background-color: #dcdcdc !important;
    }
  }
</style>
