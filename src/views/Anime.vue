<template>
  <loader v-if="!anime"></loader>
  <div v-else>
    <div class="anime-page-banner" :style="{ 'background-image': `url(${anime.background})` }"></div>
    <v-container class="anime-page-container">
      <v-layout row wrap>
        <v-flex offset-sm1 sm7 class="anime-infos">
          <p-img class="anime-cover" alt="cover" :src="anime.cover"/>
          <h3 class="uppercase">{{ anime.names[0] }}</h3>
            <ul>
              <li>
                <div class="list-name" v-t="anime.names.length > 1 ? 'anime.names' : 'anime.name'"></div>
                {{ anime.names.join(', ') }}
              </li>
              <li>
                <div class="list-name" v-if="anime.authors.length" v-t="anime.authors.length > 1 ? 'anime.authors' : 'anime.author'"></div>
                <div  v-for="(author, i) in anime.authors" :key="i" style="display: inline">
									{{ i > 0 ? ',' : "" }}
									<router-link :to="{ name: 'Author', params: { id: author.id }}">
										{{ author.name }}
									</router-link>
								</div>
              </li>
              <li>
                <div class="list-name" v-if="anime.tags.length" v-t="'anime.tags'"></div>
                {{ anime.tags.map(({ name }) => name).join(', ') }}
              </li>
              <li>
                <div class="list-name" v-t="'anime.status'"></div>
                <div v-t="`anime_status.${anime.status}`"></div>
              </li>
            </ul>
          <p>{{ anime.desc }}</p>
          <div class="text-xs-center" v-if="trailers.length">
            <h4 class="uppercase" v-t="'anime.trailer'"></h4>
						​<div class="videoWrapper">
							<iframe 
								width="100%" 
								:src="trailers[0].content" 
								frameborder="0" 
								allow="autoplay; encrypted-media" 
								allowfullscreen
							></iframe>
						</div>
          </div>
        </v-flex>
        <v-flex sm3 xs12>
          <v-btn class="main-color" block large light>
            <v-icon class="white--text">favorite</v-icon>
            {{ $t('anime.subscribe') }}
          </v-btn>
          <div class="rate-container">
            <div class="text-xs-center">
              <h4 v-t="'anime.rating'"></h4>
              <rating v-model="anime.rating"></rating>
            </div>
          </div>
          <media-list :anime="anime"></media-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Loader from "../components/layout/Loader";
import { VBtn, VIcon } from "vuetify";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import Rating from "../components/Rating";
import MediaList from "../components/media/MediaList";
import PImg from "../components/ProgressiveImg";
import gql from "graphql-tag";
import { client } from "../graphql";

export default {
	props: ["id"],
	data() {
		return {
			anime: null
		};
	},
	watch: {
		anime() {
			if (!this.anime) {
				this.$router.replace({ name: "404" });
				return;
			}
			this.$emit("updateHead");
		}
	},
	computed: {
		trailers() {
			return this.anime.medias.filter(({ type }) => type === "TRAILER");
		}
	},
	apollo: {
		anime: {
			query: gql`
				query($id: ID!) {
					anime(id: $id) {
						id
						names
						cover
						background
						status
						desc
						tags {
							name
						}
						authors {
							id
							name
						}
						medias {
							id
							name
							type
							content
						}
						seasons {
							name
							episodes {
								id
								name
								content
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
			update: ({ anime }) => anime
		}
	},
	components: {
		Loader,
		VContainer,
		VFlex,
		VLayout,
		VBtn,
		VIcon,
		Rating,
		MediaList,
		PImg
	},
	head: {
		title() {
			if (this.anime)
				return {
					inner: this.anime.names[0]
				};
		},
		meta() {
			if (this.anime)
				return [
					{
						property: "og:title",
						content: this.anime.names[0],
						id: "og:title"
					},
					{ property: "og:image", content: this.anime.cover, id: "og:image" },
					{
						property: "og:description",
						content: this.anime.desc,
						id: "og:description"
					},
					{
						name: "description",
						content: this.anime.desc,
						id: "description"
					}
				];
		}
	},
	i18n: {
		messages: {
			fr: {
				anime: {
					subscribe: "S'abonner",
					name: "Nom :",
					names: "Noms :",
					author: "Auteur :",
					authors: "Auteurs :",
					tags: "Tags :",
					status: "Statut :",
					trailer: "Trailer :",
					rating: "Note :"
				}
			},
			en: {
				anime: {
					subscribe: "Subscribe",
					name: "Name:",
					names: "Names:",
					author: "Author:",
					authors: "Authors:",
					tags: "Tags:",
					status: "Status:",
					trailer: "Trailer:",
					rating: "Rating:"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import '../stylus/main.styl';

  .uppercase {
    text-transform: uppercase;
  }

  .anime-page-banner {
    width: 100%;
    height: 405px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #2f2f2f;
  }

  .anime-page-container {
    padding-top:30px;

		.videoWrapper {
			position: relative;
			padding-bottom: 56.25%; /* 16:9 */
			padding-top: 25px;
			height: 0;

			iframe {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	

    .anime-infos {
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

    .anime-cover {
      margin-right: 18px;
      margin-bottom: 15px;
      width: 180px;
      height: 250px;
      margin-top: -105px;
      box-shadow: 0px 2px 12px 0px rgba(16,16,17,0.5);
      float: left;
    }

    .rate-container {
      background-color: #dcdcdc;
      margin-top: 15px;
      padding: 30px;
    }
  }

  .application.theme--dark .anime-page-container {
    .rate-container {
      background-color: #454545;
    }
  }

</style>
