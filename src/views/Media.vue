<template>
  <loader v-if="loading"></loader>
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
					:media="media"
					:value="media.content"
					:key="media.content"
					:background-image="$vuetify.breakpoint.xs && media.anime.background"
				></video-player>
			</template>
    </div>
    <v-container class="media-page-container">
      <v-layout row wrap>
        <v-flex offset-sm1 sm7 class="anime-infos">
          <v-layout row wrap>
            <v-flex xs12>
              <router-link :to="{ name: 'Anime', params: { id: media.anime.id }}" class="link">
                <p-img class="media-cover" alt="cover" :src="media.anime.cover.normal"/>
                <h3 class="uppercase">{{ media.anime.names[0] }}</h3>
              </router-link>
              <p class="sub">
                <span v-html="title"></span>
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
          <v-btn class="secondary room" block large>
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
							v-model="commentText"
              multi-line
              auto-grow
              rows="3"
							label="Ecrire un commentaire"
							solo
							@focus="needAuth()"
            >
            </v-text-field>
						<v-flex class="text-xs-right">
							<v-btn small class="main-color comment-btn" @click.stop="comment()">Commenter</v-btn>
						</v-flex>
						<div v-if="media.comments.length > 0">
							<v-divider></v-divider>
							<div class="text-xs-center">
								<h4 class="uppercase title">Commentaires</h4>
							</div>
							<comment v-for="comment in media.comments" :value="comment" :key="comment.id" :isReply="false"></comment>
						</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider, VTextField } from "vuetify";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import Comment from "../components/media/Comment";
import MediaList from "../components/media/MediaList";
import VideoPlayer from "../components/player/GlobalPlayer";
import Loader from "../components/layout/Loader";
import PImg from "../components/ProgressiveImg";
import { client } from "../graphql";
import gql from "graphql-tag";
import clone from "clone";

export default {
	props: ["id", "mediaId", "season", "episode"],
	data() {
		return {
			media: null,
			commentText: null
		};
	},
	methods: {
		needAuth() {
			if (!this.$store.state.isAuth) this.$router.push({ name: "Login" });
		},
		capitalize(string) {
			return string.replace(/\b\w/g, l => l.toUpperCase());
		},
		comment() {
			this.$apollo
				.query({
					query: gql`
						query comment($id: ID, $content: String!) {
							media(media: $id) {
								comment(content: $content) {
									id
									content
									posted
									user {
										login
										avatar
									}
								}
							}
						}
					`,
					variables: {
						id: this.media.id,
						content: this.commentText
					}
				})
				.then(({ data: { media: { comment } } }) =>
					this.media.comments.push(comment)
				);
			this.commentText = null;
		}
	},
	watch: {
		media(media) {
			this.$emit("updateHead");
			if ("mediaSession" in navigator) {
				navigator.mediaSession.metadata = new MediaMetadata({
					title: media.anime.names[0],
					artist: media.anime.authors.length ? media.anime.authors[0].name : "",
					album: this.title,
					artwork: [
						{
							src: this.media.anime.cover.normal,
							sizes: "180x250"
						},
						{
							src: this.media.anime.cover.big,
							sizes: "720x1000"
						}
					]
				});
			}
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
						content: this.media.anime.cover.big,
						id: "og:image"
					}
				];
		}
	},
	computed: {
		title() {
			const title =
				this.media.type !== "EPISODE"
					? `${this.capitalize(this.media.type.toLowerCase())}: ${this.media
							.name || "No name"} `
					: `Saison ${this.season}, épisode ${this.episode}: ${this.media
							.name || `Episode ${this.episode}`}`;
			return title;
		},
		host() {
			return this.media.content.split("/")[2];
		},
		loading() {
			return !this.media;
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
						id
						content
						type
						# used for return to media button in floating player
						... on Episode {
							episode
							season
						}
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
							cover {
								normal
								big
							}
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
			update({ media }) {
				if (!media) {
					this.$router.replace({ name: "404" });
					return;
				}
				return clone(media);
			}
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
  @import '../stylus/main.styl';

  .uppercase {
    text-transform: uppercase;
  }

  .media-page-container {
    padding-top: 30px;

		.room {
			color: black !important
		}

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

    .media-cover {
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
		font-size: 0;

		iframe {
			display: inline-block;
			padding: 30px;
			width: 100%;
			max-width: 900px;
			height: 506px;
		}

    & > .media-player {
      display: inline-block;
      width: 100%;
      max-width: 900px;
    }

		@media (max-width: 600px) {
			padding: 0;

			& > .media-player video {
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
			}

			iframe {
				padding: 0px;
				height: 250px;
			}
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
