<template>
  <div class="library-playlist" v-if="user && playlist">
    <v-list class="elements elevation-2">
      <p v-if="elements.length == 0" class="text-xs-center">Cette playlist est vide</p>
      <div v-else v-for="elem in elements" :key="elem.id">
        <v-list-tile class="elem" v-if="elem.type === 'MEDIA'">
          <img :src="elem.cover.normal" class="elem-cover">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ elem.name }}
              <v-btn icon small :to="elem.to"><v-icon>remove_red_eye</v-icon></v-btn>
              <v-btn icon small right @click.stop="remove(elem)" v-if="isMe"><v-icon>clear</v-icon></v-btn>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="elem.subname"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
		<v-list-group v-else>
			<v-list-tile class="elem" slot="activator">
				<img :src="elem.cover.normal" class="elem-cover">
				<v-list-tile-content>
					<v-list-tile-title>
					{{ elem.name }}
					<v-btn icon small :to="elem.to"><v-icon>remove_red_eye</v-icon></v-btn>
					<v-btn icon small right @click.stop="remove(elem)" v-if="isMe"><v-icon>clear</v-icon></v-btn>
					</v-list-tile-title>
					<v-list-tile-sub-title v-html="elem.subname"></v-list-tile-sub-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-list-tile class="elem-list">
				<v-list-tile-content>
					<cover-list :value="elem.medias.map(e => formatElement(e, elem.anime))">
						<loader class="float" v-if="!elem.medias"/>
					</cover-list>
				</v-list-tile-content>
			</v-list-tile>
		</v-list-group>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider } from "vuetify";

import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle,
	VListTileSubTitle
} from "vuetify/es5/components/VList";

import CoverList from "../../../components/cover/CoverList";
import Loader from "../../../components/layout/Loader";
import gql from "graphql-tag";

export default {
	name: "library-playlist",
	props: ["id", "userLogin"],
	components: {
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VListTileSubTitle,
		VDivider,
		VBtn,
		VIcon,
		CoverList,
		Loader
	},
	data() {
		return {
			me: null,
			user: null,
			playlist: null
		};
	},
	computed: {
		isMe() {
			return this.me && this.user.id === this.me.id;
		},
		elements() {
			return this.playlist.elements
				? this.playlist.elements.map(({ media, anime = media.anime }) =>
						this.formatElement(media, anime)
				  )
				: [];
		}
	},
	methods: {
		formatElement(media, anime) {
			const formatSubname = ({ type, episode, season, name } = {}) => {
				if (type === "EPISODE")
					return `Ep ${episode + 1} S${season + 1} ${name ? ": " + name : ""}`;
				else return name;
			};

			const formatRoute = ({ type } = {}) => {
				if (type) return type === "EPISODE" ? "Episode" : "Media";
				else return "Anime";
			};

			return {
				anime,
				type: media ? "MEDIA" : "ANIME",
				medias: anime && anime.medias,
				id: (media || anime).id,
				cover: anime.cover,
				name: anime.names[0],
				subname: formatSubname(media) || anime.desc,
				to: {
					name: formatRoute(media),
					params: {
						id: anime.id,
						season: media && media.season + 1,
						episode: media && media.episode + 1,
						mediaId: media && media.id
					}
				}
			};
		}
	},
	apollo: {
		user: {
			query() {
				return gql`
					query user($name: String!) {
						user(name: $name) {
							id
						}
					}
				`;
			},
			variables() {
				return {
					name: this.userLogin
				};
			},
			skip() {
				return !this.userLogin || this.me === false;
			},
			update: ({ user }) => user
		},
		me: {
			query: gql`
				{
					me {
						id
					}
				}
			`,
			update: ({ me }) => me
		},
		playlist: {
			query: gql`
				query($id: ID!) {
					getPlaylist(id: $id) {
						id
						name
						elements {
							... on PlaylistAnimeElem {
								date
								anime {
									id
									names
									desc
									cover {
										normal
									}
									seasons {
										episodes {
											id
											type
											name
											... on Episode {
												season
												episode
											}
										}
									}
									medias {
										id
										type
										name
									}
								}
							}
							... on PlaylistMediaElem {
								date
								media {
									id
									type
									name
									anime {
										id
										cover {
											normal
										}
									}
									... on Episode {
										season
										episode
									}
								}
							}
						}
					}
				}
			`,
			variables() {
				return {
					id: this.id
				};
			},
			update: ({ getPlaylist }) => getPlaylist
		}
	}
};
</script>

<style lang="stylus">
    @import '../../../stylus/main.styl'

	.library-playlist {
		.elements {
			padding-bottom 0px
			.elem  {
				padding-bottom: 8px;
				width calc(100% - 60px)
				.list__tile {
					height auto !important
					align-items initial !important;
					
					.elem-cover {
						padding-top 8px;
						height 120px;
					}
				}

				.list__tile__title {
					height auto;
					font-size 22px
				}

				.list__tile__content {
					padding-left: 15px;
					
				}

				.list__tile__sub-title {
					white-space: normal !important
					display -webkit-box 
					-webkit-line-clamp 3
					-webkit-box-orient vertical
				}
			}
			
			.elem-list {
				.list__tile {
					background-color rgba(0,0,0, 0.2)
					padding 1px
					height auto !important
				}
				.cover-list {
					width 100% !important;
				}
			}
		}
	}
</style>
