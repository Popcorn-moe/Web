<template>
  <loader v-if="!author"></loader>
  <div v-else>
    <v-carousel class="banner">
      <v-carousel-item  v-for="(v, i) in author.animes" :src="v.background" :key="i">
        <router-link :to="{ name: 'Anime', params: { id: v.id }}" class="link" :style="{ 'margin-left': (!drawer && $vuetify.breakpoint.mdAndUp ? 60 : 15) + 'px' }">
          {{ v.names[0] }}
        </router-link>
      </v-carousel-item>
    </v-carousel>
    <v-container class="author-page-container">
      <v-layout row wrap>
        <v-flex offset-sm1 sm10 class="author-infos">
          <img class="author-picture" alt="cover" :src="author.picture"/>
          <h3 class="uppercase">{{ author.name }}</h3>
          <div v-html="bio()"></div>
        </v-flex>
        <v-flex xs12>
          <div class="text-xs-center">
            <h4>Animes</h4>
            <cover-list :value="animes">
              <loader class="float" v-if="animes.length === 0"></loader>
            </cover-list>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Loader from "../components/layout/Loader";
import CoverList from "../components/cover/CoverList.vue";
import { VBtn, VIcon } from "vuetify";
import { VCarousel, VCarouselItem } from "vuetify/es5/components/VCarousel";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import gql from "graphql-tag";
import marked from "marked";
import { mapGetters } from "vuex";

export default {
	name: "AuthorPage",
	props: ["id"],
	data() {
		return {
			author: null
		};
	},
	apollo: {
		author: {
			query: gql`
				query($id: ID!) {
					author(id: $id) {
						id
						name
						picture
						bio
						animes(limit: 0, sort: ASC) {
							id
							cover
							background
							names
							authors {
								name
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
			update: ({ author }) => author
		}
	},
	computed: {
		...mapGetters({
			drawer: "drawer"
		}),
		animes() {
			return this.author.animes
				? this.author.animes.map(
						({ id, names: [name], authors: [author], ...fields }) => ({
							name,
							author,
							to: { name: "Anime", params: { id } },
							...fields
						})
					)
				: [];
		}
	},
	methods: {
		bio() {
			return marked(this.author.bio);
		}
	},
	components: {
		VCarouselItem,
		VCarousel,
		Loader,
		VBtn,
		VIcon,
		VContainer,
		VFlex,
		VLayout,
		CoverList,
		marked
	}
};
</script>

<style lang="stylus">
  @import '../stylus/main'

  .banner {
    .link {
      transition all 0.5s
      background-color rgba(38, 38, 38, 0.68)
      display inline-block
      color white;
      margin-top 15px;
      padding-top 3px;
      padding-bottom 3px;
      padding-left 15px;
      padding-right 15px;
      font-size 14pt;
      text-decoration none
      font-weight bold
      width auto
    }
  }

  .author-page-container {
    padding-top: 30px;

    .anime-list {
      width 100%
    }

    .author-infos {
      text-align: justify;
      padding-right: 10px !important

      h3 {
        margin-bottom: 10px !important
      }

      li {
        list-style: none;
        padding-right: 10px !important
      }

      .list-name {
        float: left;
        padding-right: 3px;
        font-weight: bold;
      }

      .list-name:before {
        float: right;
      }

      p {
        padding-top: 30px;
        padding-right: 10px;
      }
    }

    .author-picture {
      position relative
      z-index 2
      background-color $main-color
      margin-right: 18px;
      margin-bottom: 15px;
      width: 180px;
      height: 250px;
      margin-top: -105px;
      box-shadow: 0px 2px 12px 0px rgba(16,16,17,0.5);
      float: left;
    }
  }
</style>
