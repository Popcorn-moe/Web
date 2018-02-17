<template>
    <v-container>
      <v-layout>
        <v-flex xs3>
          <v-list class="library-list">
            <v-list-tile @click.stop="">
              <v-list-tile-content>
                <v-list-tile-title>Historique</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click.stop="">
              <v-list-tile-content>
                <v-list-tile-title>Follows</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-group>
              <v-list-tile slot="item">
                <v-list-tile-content>
                  <v-list-tile-title>Playlists</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-for="playlist in playlists" :key="playlist.name" @click="selectPlaylist(playlist.id)">
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
          <div class="playlist-content">
            <p class="text-xs-center" v-if="currentPlaylist.medias.length <= 0">La playlist est vide</p>
            {{ currentPlaylist.medias }}
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script>
import { VIcon, VBtn } from "vuetify/es5/components";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import gql from "graphql-tag";

export default {
	name: "user_library",
	data() {
		return {
			me: {},
			playlists: [],
			currentPlaylist: { medias: [] }
		};
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
	methods: {
		selectPlaylist(id) {
			this.currentPlaylist = this.playlists.filter(p => p.id === id)[0];
		}
	},
	apollo: {
		me: {
			query: gql`
				{
					me {
						playlists {
							id
							name
							medias {
								... on PlaylistMediaElem {
									media {
										id
										type
									}
								}
								... on PlaylistAnimeElem {
									anime {
										id
										names
									}
								}
							}
						}
					}
				}
			`,
			update: function({ me }) {
				console.log(me);
				this.playlists = me.playlists;
				this.currentPlaylist = this.playlists[0];
				return me;
			}
		}
	}
};
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
