<template>
  <loader v-if="loading"></loader>
  <div v-else>
    <div class="anime-page-banner" :style="{ 'background-image': `url(${anime.background})` }"></div>
    <v-container class="anime-page-container">
      <v-layout row wrap>
        <v-flex offset-xs1 xs7 class="anime-infos">
          <img class="anime-cover" :src="anime.cover">
          <h3 class="uppercase">{{ anime.names[0] }}</h3>
          <ul>
            <li v-for="author in anime.authors" :key="author.id">
              <div class="list-name" v-t="'anime.author'"></div>
              {{ author.name }}
            </li>
          </ul>
          <p>{{ anime.desc }}</p>
          <div class="text-xs-center">
            <h4 class="uppercase" v-t="'anime.trailer'"></h4>
          </div>
        </v-flex>
        <v-flex xs3>
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
          <media-list :anime="id"></media-list>
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
		// Try from cache
		try {
			const anime = client.readFragment({
				id: this.id,
				fragment: gql`
					fragment anime on Anime {
						names
						cover
						background
						authors {
							id
							name
						}
					}
				`
			});
			if (anime) return { anime, loading: false };
		} catch (e) {
			console.log(e);
		}
		// Query it
		client
			.query({
				query: gql`
					query($id: ID!) {
						anime(id: $id) {
							names
							cover
							background
							authors {
								id
								name
							}
						}
					}
				`,
				variables: {
					id: this.id
				}
			})
			.then(({ data: { anime } }) => {
				if (anime) {
					this.anime = anime;
					this.loading = false;
				} else this.$router.replace({ name: "404" });
			});
		return {
			anime: null,
			loading: true
		};
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
	i18n: {
		messages: {
			fr: {
				anime: {
					subscribe: "S'abonner",
					author: "Auteur :",
					trailer: "Trailer :",
					rating: "Note :"
				}
			},
			en: {
				anime: {
					subscribe: "Subscribe",
					author: "Author :",
					trailer: "Trailer :",
					rating: "Rating :"
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
