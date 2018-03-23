<template>
  <loader v-if="!media"></loader>
  <div v-else>
    <div class="media-banner" :style="{ 'background-image': `url(${media.anime.background})` }">
			<template v-if="host.startsWith('www.youtube')">
				<iframe 
					width="100%" 
					:src="media.content" 
					frameborder="0" 
					allow="autoplay; encrypted-media" 
					allowfullscreen
				></iframe>
			</template>
			<template v-else>
				<video-player
					owner="media"
					class="media-player"
					v-if="media.content"
					:value="media.content"
					:key="media.content"
				></video-player>
			</template>
    </div>
    <v-container class="media-page-container">
      <v-layout row wrap>
        <v-flex offset-sm1 sm7 class="anime-infos">
          <v-layout row wrap>
            <v-flex xs12>
              <router-link :to="{ name: 'Anime', params: { id: media.anime.id }}" class="link">
                <p-img class="anime-cover" alt="cover" :src="media.anime.cover"/>
                <h3 class="uppercase">{{ media.anime.names[0] }}</h3>
              </router-link>
              <p class="sub">
                <span v-if="media.type === 'EPISODE'">Saison {{ season }}, épisode {{ episode }}: {{ media.name }}</span>
                <span v-if="media.type !== 'EPISODE'">{{ capitalize(media.type.toLowerCase()) }} : {{ media.name }}</span>
              </p>
              <ul>
                <li>
                  <div class="list-name" v-t="media.anime.names.length > 1 ? 'media.names' : 'media.name'"></div>
                  {{ media.anime.names.join(', ') }}
                </li>
                <li>
                  <div class="list-name" v-if="media.anime.authors.length" v-t="media.anime.authors.length > 1 ? 'media.authors' : 'media.author'"></div>
									<div  v-for="(author, i) in media.anime.authors" :key="i" style="display: inline">
										{{ i > 0 ? ',' : "" }}
										<router-link :to="{ name: 'Author', params: { id: author.id }}">
											{{ author.name }}
										</router-link>
									</div>
                </li>
                <li>
                  <div class="list-name" v-if="media.anime.tags.length" v-t="'media.tags'"></div>
                  {{ media.anime.tags.map(({ name }) => name).join(', ') }}
                </li>
                <li>
                  <div class="list-name" v-t="'media.status'"></div>
                  <div v-t="`anime_status.${media.anime.status}`"></div>
                </li>
              </ul>
            </v-flex>
          </v-layout>

        </v-flex>
        <v-flex sm3 xs12>
          <v-btn class="secondary-color black--text" block large>
            Créer une room
          </v-btn>
          <div class="infos">
            <div class="text-xs-center">
              <p>20min</p>
            </div>
          </div>
          <media-list :anime="media.anime" :active="season - 1"></media-list>
        </v-flex>
        <v-flex sm12 offset-lg1 lg10>
            <v-divider></v-divider>
						<v-text-field
              multi-line
              auto-grow
              rows="3"
							label="Ecrire un commentaire"
							solo
            >
            </v-text-field>
						<v-layout row>
              <v-flex offset-xs10 xs2>
                <v-btn small block class="main-color comment-btn">Commenter</v-btn>
              </v-flex>
            </v-layout>
						<v-divider></v-divider>
						<div class="text-xs-center">
            	<h4 class="uppercase title">Commentaires</h4>
						</div>
            <comment v-for="comment in media.comments" :value="comment" :key="comment.id" :isReply="false"></comment>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider, VTextField } from "vuetify/es5/components";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import Comment from "./Comment";
import MediaList from "./MediaList";
import VideoPlayer from "../player/GlobalPlayer";
import Loader from "../layout/Loader";
import PImg from "../ProgressiveImg";
import gql from "graphql-tag";
import { client } from "../../graphql";

export default {
	props: ["id", "mediaId", "season", "episode"],
	data() {
		return {
			media: null
		};
	},
	methods: {
		capitalize(string) {
			return string.replace(/\b\w/g, l => l.toUpperCase());
		}
	},
	watch: {
		madia() {
			if (!this.media) {
				this.$router.replace({ name: "404" });
				return;
			}
			this.$emit("updateHead");
		}
	},
	head: {
		title() {
			if (this.media)
				return {
					inner: this.media.anime.names[0]
				};
		},
		meta() {
			if (this.media)
				return [
					{
						property: "og:title",
						content: this.media.anime.names[0],
						id: "og:title"
					},
					{
						property: "og:image",
						content: this.media.anime.cover,
						id: "og:image"
					}
				];
		}
	},
	computed: {
		host() {
			return this.media.content.split("/")[2];
		}
	},
	apollo: {
		media: {
			query: gql`
				query media($media: ID, $anime: ID, $episode: Int, $season: Int) {
					media(
						media: $media
						anime: $anime
						episode: $episode
						season: $season
					) {
						content
						type
						name
						comments {
							id
							content
							replies_count
							posted
							user {
								login
								avatar
							}
						}
						anime {
							status
							names
							authors {
								id
								name
							}
							tags {
								id
								name
							}
							medias {
								id
								type
								name
							}
							seasons {
								name
								episodes {
									id
									name
									type
								}
							}
							id
							cover
							background
						}
					}
				}
			`,
			variables() {
				return {
					anime: this.id,
					media: this.mediaId,
					episode: this.episode - 1,
					season: this.season - 1
				};
			},
			update: ({ media }) => media
		}
	},
	components: {
		VTextField,
		VContainer,
		VFlex,
		VLayout,
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VDivider,
		VBtn,
		VIcon,
		Comment,
		MediaList,
		VideoPlayer,
		Loader,
		PImg
	},
	i18n: {
		messages: {
			fr: {
				media: {
					name: "Nom :",
					names: "Noms :",
					author: "Auteur :",
					authors: "Auteurs :",
					tags: "Tags :",
					status: "Statut :"
				}
			},
			en: {
				media: {
					name: "Name:",
					names: "Names:",
					author: "Author:",
					authors: "Authors:",
					tags: "Tags:",
					status: "Status:"
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

  .media-page-container {
    padding-top: 30px;

    .link {
      text-decoration none
    }

    .divider {
      margin-top: 30px;
      margin-bottom: 30px;
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

      .sub {
        padding-top: 3px;
        margin-bottom: 15px;
      }

      p {
        padding-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
      }
    }

    .infos {
      margin-top: 15px;
      padding: 30px;
    }

    .anime-cover {
      margin-right: 18px;
      margin-bottom: 15px;
      width: 180px;
      height: 250px;
      box-shadow: 0px 2px 12px 0px rgba(16, 16, 17, 0.5);
      float: left;
    }

		.title {
			margin-bottom: 30px;
		}

		.comment-btn {
			margin-top: 10px;
		}
  }

  .media-banner {
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #2f2f2f;
    padding: 30px 0;

		iframe {
			display: inline-block;
			padding: 30px;
			width: 100%;
			max-width: 900px;
			height: 506px;
		}

    & > .media-player
    {
      display: inline-block;
      width: 100%;
      max-width: 900px;
    }
  }

  .application.theme--dark .media-page-container {
    .infos {
      background-color: #454545;
    }
  }

  .application.theme--light .media-page-container {
    .infos {
      background-color: #dcdcdc;
    }
  }

</style>
