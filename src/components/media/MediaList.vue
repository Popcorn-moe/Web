<template>
  <v-list class="media-list" v-if="anime">
    <v-list-group v-for="(season, si) in anime.seasons" v-if="season" :value="si == active" :key="season.name">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Season {{ si + 1}}{{ season.name && `: ${season.name}` }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="(ep, ei) in season.episodes"
        :key="ep.name"
        :to="{ name: 'Episode', params: { id: anime.id, season: si + 1, episode: ei + 1 }}"
      >
        <v-list-tile-title>
          <v-list-tile-title>Episode {{ ei + 1}}{{ ep.name && `: ${ep.name}` }}</v-list-tile-title>
        </v-list-tile-title>
      </v-list-tile>
    </v-list-group>
    <v-list-group v-if="musics.length > 0">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Musics</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="(media) in musics"
        :key="media.id"
        :to="{ name: 'Media', params: { id: anime.id, mediaId: media.id }}"
      >
        <v-list-tile-title>
          <v-list-tile-title>{{ capitalize(media.type.toLowerCase()) }}: {{ media.name }}</v-list-tile-title>
        </v-list-tile-title>
      </v-list-tile>
    </v-list-group>
    <v-list-group v-if="trailers.length > 0">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Trailers</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="(media) in trailers"
        :key="media.id"
        :to="{ name: 'Media', params: { id: anime.id, mediaId: media.id }}"
      >
        <v-list-tile-title>
          <v-list-tile-title>{{ capitalize(media.type.toLowerCase()) }}: {{ media.name }}</v-list-tile-title>
        </v-list-tile-title>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
import { VIcon } from "vuetify";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";

export default {
	props: ["anime", "active"],
	methods: {
		capitalize(string) {
			return string.replace(/\b\w/g, l => l.toUpperCase());
		}
	},
	computed: {
		musics() {
			return this.anime.medias.filter(
				({ type }) => type === "OPENING" || type === "ENDING" || type === "OST"
			);
		},
		trailers() {
			return this.anime.medias.filter(({ type }) => type === "TRAILER");
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
};
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
