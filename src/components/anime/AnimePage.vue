<template>
  <loader v-if="!anime"></loader>
  <div v-else>
    <div class="anime-page-banner" :style="{ 'background-image': `url(${anime.background})` }"></div>
    <v-container class="anime-page-container">
      <v-layout row wrap>
        <v-flex offset-sm1 sm7 class="anime-infos">
          <img class="anime-cover" alt="cover" :src="anime.cover">
          <h3 class="uppercase">{{ anime.names[0] }}</h3>
            <ul>
              <li>
                <div class="list-name" v-t="anime.names.length > 1 ? 'anime.names' : 'anime.name'"></div>
                {{ anime.names.join(', ') }}
              </li>
              <li>
                <div class="list-name" v-t="anime.authors.length > 1 ? 'anime.authors' : 'anime.author'"></div>
                {{ anime.authors.map(({ name }) => name).join(', ') }}
              </li>
              <li>
                <div class="list-name" v-t="'anime.tags'"></div>
                {{ anime.tags.map(({ name }) => name).join(', ') }}
              </li>
              <li>
                <div class="list-name" v-t="'anime.status'"></div>
                <div v-t="`anime_status.${anime.status}`"></div>
              </li>
            </ul>
          <p>{{ anime.desc }}</p>
          <div class="text-xs-center">
            <h4 class="uppercase" v-t="'anime.trailer'"></h4>
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
import Loader from "../layout/Loader";
import { VBtn, VIcon } from "vuetify/es5/components";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import Rating from "./Rating";
import MediaList from "../media/MediaList";
import gql from "graphql-tag";
import { client } from "../../graphql";

export default {
	props: ["id"],
	data() {
		return {
			anime: null
		};
	},
	watch: {
		anime() {
			this.$emit("updateHead");
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
			update({ anime }) {
				if (!anime) this.$router.replace({ name: "404" });
				else return anime;
			}
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
		MediaList
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
  @import '../../stylus/main.styl';

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

    .anime-infos {
      text-align: justify;
      h6 {
        margin-bottom: 3px;
      }

      li {
        list-style: none;
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
        padding-left: 15px;
        padding-right: 15px;
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
