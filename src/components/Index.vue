<template>
	<div>
		<v-carousel class="white--text" :key="slides.length">
      <v-carousel-item  v-for="(v, i) in slides" :src="v.image" :key="i">
        <div class="slide-content">
          <v-layout v-if="v.title">
            <v-flex class="title" xs6 lg3 md3>{{ v.title }}</v-flex>
          </v-layout>
          <v-layout v-if="v.desc">
            <v-flex class="desc" v-html="desc(v.desc)" xs12 lg6 md6></v-flex>
          </v-layout>
        </div>
      </v-carousel-item>
		</v-carousel>
		<div class="text-xs-center index-animes">
			<h3 class="anime-list-title" v-t="'index.last_episodes'"></h3>
			<cover-list :value="lastEpisodes || []">
					<loader class="float" v-if="lastEpisodes === null"/>
			</cover-list>
			<h3 class="anime-list-title" v-t="'index.last_trailers'"></h3>
			<cover-list :value="lastTrailers || []">
				<loader class="float" v-if="lastTrailers === null"/>
			</cover-list>
		</div>
	</div>
</template>

<script>
import { VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { VCarousel, VCarouselItem } from "vuetify/es5/components/VCarousel";
import CoverList from "./cover/CoverList";
import Loader from "./layout/Loader";
import gql from "graphql-tag";
import marked from "marked";

export default {
	name: "index",
	data() {
		return {
			lastEpisodes: null,
			lastTrailers: null,
			slides: []
		};
	},
	components: {
		CoverList,
		Loader,
		VCarousel,
		VCarouselItem,
		VFlex,
		VLayout
	},
	apollo: {
		lastEpisodes: {
			query: gql`
				{
					lastEpisodes {
						id
						name
						type
						anime {
							id
							names
							authors {
								id
								name
							}
							cover
						}
						... on Episode {
							season
							episode
						}
					}
				}
			`,
			update: ({ lastEpisodes }) =>
				lastEpisodes.map(
					({
						id,
						name: subname,
						anime: { id: animeId, cover, authors: [author], names: [name] },
						season,
						episode,
						type
					}) => ({
						id,
						name,
						subname: `Ep ${episode + 1} S${season + 1} ${
							subname ? ": " + subname : ""
						}`,
						cover,
						author,
						to: {
							name: "Episode",
							params: { id: animeId, season: season + 1, episode: episode + 1 }
						}
					})
				)
		},
		lastTrailers: {
			query: gql`
				{
					lastTrailers {
						id
						name
						type
						anime {
							id
							names
							authors {
								id
								name
							}
							cover
						}
					}
				}
			`,
			update: ({ lastTrailers }) =>
				lastTrailers.map(
					({
						id: mediaId,
						name: subname,
						anime: { id, cover, authors: [author], names: [name] },
						type
					}) => ({
						id: media,
						name,
						subname,
						cover,
						author,
						to: { name: "Media", params: { id, mediaId } }
					})
				)
		},
		slides: {
			query: gql`
				{
					slider {
						id
						title
						desc
						image
					}
				}
			`,
			update: ({ slider }) => {
				return slider;
			}
		}
	},
	methods: {
		desc(desc) {
			return marked(desc);
		}
	},
	head: {
		title() {
			return {
				inner: this.$t("route.index")
			};
		}
	},
	i18n: {
		messages: {
			fr: {
				index: {
					last_episodes: "Derniers Episodes",
					last_trailers: "Derniers trailers"
				}
			},
			en: {
				index: {
					last_episodes: "Last Episodes",
					last_trailers: "Last trailers"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import '../stylus/main'

  .index-animes {
    margin-top: 40px;

    .anime-list-title {
      margin: 0;
      font-size: 20px;
    }
  }

  .slide-content {
    margin-left 30px;
    margin-right 30px;
    margin-top 30vh !important
    color white !important

    .title {
      font-size 25pt !important
      background-color rgba(38, 38, 38, 0.68)
      padding-left 15px;
      padding-right 15px;
    }

    .desc {
      margin-top 10px
      background-color rgba(38, 38, 38, 0.48)
      padding-left 15px;
      padding-right 15px;
    }
  }
</style>
