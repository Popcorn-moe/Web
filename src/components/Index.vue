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
			<anime-list :value="animes">
					<loader class="float" v-if="animes.length === 0"/>
			</anime-list>
			<h3 class="anime-list-title" v-t="'index.last_trailers'"></h3>
			<anime-list :value="animes">
				<loader class="float" v-if="animes.length === 0"/>
			</anime-list>
		</div>
	</div>
</template>

<script>
import { VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { VCarousel, VCarouselItem } from "vuetify/es5/components/VCarousel";
import AnimeList from "./anime/AnimeList";
import Loader from "./layout/Loader";
import gql from "graphql-tag";
import marked from "marked";

export default {
	name: "index",
	data() {
		return {
			animes: [],
			slides: []
		};
	},
	components: {
		AnimeList,
		Loader,
		VCarousel,
		VCarouselItem,
		VFlex,
		VLayout
	},
	apollo: {
		animes: {
			query: gql`
				{
					animes(limit: 50) {
						id
						names
						authors {
							id
							name
						}
						cover
						background
					}
				}
			`,
			update: ({ animes }) => animes
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
				console.log(slider);
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
