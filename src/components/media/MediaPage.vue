<template>
  <loader v-if="!anime"></loader>
  <div v-else>
    <div class="media-banner" :style="{ 'background-image': `url(${anime.background})` }">

			<template v-if="host.startsWith('www.youtube')">
				<iframe 
					width="100%" 
					:src="currMedia.content" 
					frameborder="0" 
					allow="autoplay; encrypted-media" 
					allowfullscreen
				></iframe>
			</template>
			<template v-else>
				<video-player
					owner="media"
					class="media-player"
					v-if="currMedia.content"
					:value="currMedia.content"
					:key="currMedia.content"
				></video-player>
			</template>
    </div>
    <v-container class="media-page-container">
      <v-layout row wrap>
        <v-flex offset-sm1 sm7 class="anime-infos">
          <v-layout row wrap>
            <v-flex xs12>
              <router-link :to="{ name: 'Anime', params: { id: anime.id }}" class="link">
                <p-img class="anime-cover" alt="cover" :src="anime.cover"/>
                <h3 class="uppercase">{{ anime.names[0] }}</h3>
              </router-link>
              <p class="sub">
                <span v-if="currMedia.type === 'EPISODE'">Saison {{ season }}, épisode {{ episode }}: {{ anime.seasons[season -1].episodes[episode -1].name }}</span>
                <span v-if="currMedia.type !== 'EPISODE'">{{ capitalize(currMedia.type.toLowerCase()) }} : {{ currMedia.name }}</span>
              </p>
              <ul>
                <li>
                  <div class="list-name" v-t="anime.names.length > 1 ? 'media.names' : 'media.name'"></div>
                  {{ anime.names.join(', ') }}
                </li>
                <li>
                  <div class="list-name" v-if="anime.authors.length" v-t="anime.authors.length > 1 ? 'media.authors' : 'media.author'"></div>
									<div  v-for="(author, i) in anime.authors" :key="i" style="display: inline">
										{{ i > 0 ? ',' : "" }}
										<router-link :to="{ name: 'Author', params: { id: author.id }}">
											{{ author.name }}
										</router-link>
									</div>
                </li>
                <li>
                  <div class="list-name" v-if="anime.tags.length" v-t="'media.tags'"></div>
                  {{ anime.tags.map(({ name }) => name).join(', ') }}
                </li>
                <li>
                  <div class="list-name" v-t="'media.status'"></div>
                  <div v-t="`anime_status.${anime.status}`"></div>
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
          <media-list :anime="anime" :active="season - 1"></media-list>
        </v-flex>
        <v-flex sm12 offset-lg1 lg8>
            <v-divider></v-divider>
            <comment v-for="comment in comments" :value="comment" :key="comment.id"></comment>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider } from "vuetify/es5/components";
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
	props: ["id", "media", "season", "episode"],
	data() {
		return {
			anime: null,
			comments
		};
	},
	methods: {
		capitalize(string) {
			return string.replace(/\b\w/g, l => l.toUpperCase());
		}
	},
	watch: {
		anime() {
			this.$emit("updateHead");
		}
	},
	head: {
		title() {
			if (this.anime)
				return {
					inner: this.anime.names[0]
				};
		},
		meta() {
			console.log(media);
			if (this.media)
				return [
					{
						property: "og:title",
						content: this.anime.names[0],
						id: "og:title"
					},
					{ property: "og:image", content: this.anime.cover, id: "og:image" },
					{
						property: "og:video",
						content: this.currMedia.content,
						id: "og:video"
					}
				];
		}
	},
	computed: {
		currMedia() {
			const out = this.media
				? this.anime.medias.filter(({ id }) => id === this.media)[0]
				: this.anime.seasons[this.season - 1].episodes[this.episode - 1];
			return out;
		},
		host() {
			return this.currMedia.content.split("/")[2];
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
						tags {
							name
						}
						medias {
							id
							name
							type
							content
						}
						authors {
							id
							name
						}
						seasons {
							name
							episodes {
								id
								name
								type
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
				else {
					//this.currMedia = this.media ? anime.medias.filter(({ id }) => id === this.media)[0] : null;
					return anime;
				}
			}
		}
	},
	components: {
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

const icon =
	"https://img09.deviantart.net/6825/i/2015/142/a/b/kawaii_dinosaur_by_peppermint_pop_uk-d8uaaiv.jpg";
const comments = [
	{
		id: 1,
		user: "Xx_loucass006_xX",
		date: "11 Sept.",
		icon,
		content:
			"On ne peut pas parler de politique administrative scientifique, la concertation politique par rapport aux diplomaties consent à catapulter les revenus dans les camps militaires non-voyants, c’est clair.",
		responses: [
			{
				id: 2,
				user: "Xx_loucass006_xX",
				date: "11 Sept.",
				icon,
				content:
					"Parallèlement, la systématique de l'orthodoxisation peut intentionner le point adjacent dans le prémice, mais oui.",
				responses: [
					{
						id: 3,
						user: "Xx_loucass006_xX",
						date: "11 Sept.",
						icon,
						content:
							"C’est à dire quand on parle de ces rollers, la pédagogie des lois du marché est censé(e) catapulter la renaissance africaine vers Lovanium, je vous en prie."
					}
				]
			},
			{
				id: 4,
				user: "Xx_loucass006_xX",
				date: "11 Sept.",
				icon,
				content: "moi aussi j'aime les licornes"
			}
		]
	},
	{
		id: 5,
		user: "Xx_loucass006_xX",
		date: "11 Sept.",
		icon,
		content:
			"C’est à dire quand on parle de ces rollers, la délégation autour de phylogomènes généralisés suffit à intentionner l'estime du savoir avéré(e)(s), mais oui.",
		responses: [
			{
				id: 6,
				user: "Xx_loucass006_xX",
				date: "11 Sept.",
				icon,
				content:
					"D'une manière ou d'une autre, l'imbroglio de l'orthodoxisation doit réglementer le conpemdium dans le prémice, mais oui."
			}
		]
	}
];
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
