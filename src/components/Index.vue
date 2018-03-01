<template>
  <div>
    <v-carousel class="white--text">
      <v-carousel-item v-for="(img,i) in news" alt="carousel-item" :src="img" :key="i">News {{ i }}</v-carousel-item>
    </v-carousel>
    <div class="text-xs-center animes">
      <h3 class="anime-list-title" v-t="'index.last_episodes'"></h3>
      <anime-list :value="animes"></anime-list>
      <h3 class="anime-list-title" v-t="'index.last_trailers'"></h3>
      <anime-list :value="animes"></anime-list>
    </div>
  </div>
</template>

<script>
import { VCarousel, VCarouselItem } from "vuetify/es5/components/VCarousel";
import AnimeList from "./anime/AnimeList";
import gql from "graphql-tag";

export default {
	name: "index",
	data() {
		return {
			animes: [],
			news: [
				"https://images6.alphacoders.com/505/thumb-1920-505441.jpg",
				"https://images4.alphacoders.com/706/thumb-1920-706365.png",
				"https://ib3.hulu.com/show_key_art/12104?size=1600x600&region=US"
			]
		};
	},
	components: {
		AnimeList,
		VCarousel,
		VCarouselItem
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

  .animes {
    padding-bottom: 20px;

    .anime-list-title {
      margin: 0;
      font-size: 20px;
      margin-top: 20px;
    }
  }
</style>
