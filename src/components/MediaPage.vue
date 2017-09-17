<template>
  <div>
    <div class="media">
      <video-player></video-player>
    </div>
    <v-container class="media-page-container">
      <v-layout row wrap>
        <v-flex offset-xs1 xs7 class="anime-infos">
          <v-layout row wrap>
            <v-flex xs12>
              <img class="anime-cover" :src="cover">
              <h6 class="uppercase">Titre de l'anime</h6>
              <p class="sub">Saison 2, épisode 812</p>
              <ul>
                <li>
                  <div class="list-name">Auteur :</div>
                  Jean
                </li>
                <li>
                  <div class="list-name">Auteur :</div>
                  Jean
                </li>
                <li>
                  <div class="list-name">Auteur :</div>
                  Jean
                </li>
              </ul>
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
              <comment user="Xx_loucass006_xX"
                       date="11 Sept."
                       icon="http://img09.deviantart.net/6825/i/2015/142/a/b/kawaii_dinosaur_by_peppermint_pop_uk-d8uaaiv.jpg"
                       content="On ne peut pas parler de politique administrative scientifique, la concertation politique par rapport aux diplomaties consent à catapulter les revenus dans les camps militaires non-voyants, c’est clair."
              >
                <comment user="Xx_loucass006_xX"
                         date="11 Sept."
                         icon="http://img09.deviantart.net/6825/i/2015/142/a/b/kawaii_dinosaur_by_peppermint_pop_uk-d8uaaiv.jpg"
                         content="Parallèlement, la systématique de l'orthodoxisation peut intentionner le point adjacent dans le prémice, mais oui."
                >
                  <comment user="Xx_loucass006_xX"
                           date="11 Sept."
                           icon="http://img09.deviantart.net/6825/i/2015/142/a/b/kawaii_dinosaur_by_peppermint_pop_uk-d8uaaiv.jpg"
                           content="C’est à dire quand on parle de ces rollers, la pédagogie des lois du marché est censé(e) catapulter la renaissance africaine vers Lovanium, je vous en prie."
                  >
                  </comment>
                </comment>
              </comment>

              <comment user="Xx_loucass006_xX"
                       date="11 Sept."
                       icon="http://img09.deviantart.net/6825/i/2015/142/a/b/kawaii_dinosaur_by_peppermint_pop_uk-d8uaaiv.jpg"
                       content="C’est à dire quand on parle de ces rollers, la délégation autour de phylogomènes généralisés suffit à intentionner l'estime du savoir avéré(e)(s), mais oui."
              >
                <comment user="Xx_loucass006_xX"
                         date="11 Sept."
                         icon="http://img09.deviantart.net/6825/i/2015/142/a/b/kawaii_dinosaur_by_peppermint_pop_uk-d8uaaiv.jpg"
                         content="D'une manière ou d'une autre, l'imbroglio de l'orthodoxisation doit réglementer le conpemdium dans le prémice, mais oui."
                >
                </comment>
              </comment>
            </v-flex>
          </v-layout>

        </v-flex>
        <v-flex xs3>
          <v-btn class="secondary-color black--text" block large>
            Créer une room
          </v-btn>
          <div class="infos">
            <div class="text-xs-center">
              <p>20min</p>
            </div>
          </div>
          <v-list class="media-list">
            <v-list-group v-for="media in medias" :value="media.active" v-bind:key="media.group">
              <v-list-tile slot="item">
                <v-list-tile-content>
                  <v-list-tile-title>{{ media.group }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-for="item in media.medias" v-bind:key="item.name">
                <v-list-tile-title>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { VBtn, VIcon, VDivider } from 'vuetify/src/components'
  import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/src/components/VList'
  import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'
  import Rate from './anime/Rate.vue';
  import Comment from './media/Comment.vue';
  import VideoPlayer from './player/Player.vue';

  export default {
    name      : 'media',
    data()
    {
      const medias = [];
      for (let i = 0; i < 5; i++)
      {
        medias.push(
          {
            active: i == 0,
            group : 'Saison ' + (i + 1),
            medias: [
              {
                name: 'Episode 1'
              },
              {
                name: 'Episode 2'
              },
              {
                name: 'Episode 3'
              }
            ]
          }
        );
      }
      return {
        rate  : 0,
        cover : 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763',
        medias: medias
      };
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
      Rate,
      Comment,
      VideoPlayer
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

    .divider {
      margin-top: 30px;
      margin-bottom: 30px;
    }

    .anime-infos {
      text-align: justify;
      padding-right: 10px;

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
      background-color: #dcdcdc;
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

  .media {
    text-align: center;
    height: 600px;
    background: black url(https://images6.alphacoders.com/505/thumb-1920-505441.jpg) center;
    padding-top: 40px;
    .video-player:not(:fullscreen)
    {
      height: 500px;
      width: calc(1280/720*500px);
      /*width: 80%;*/
    }
  }

  .media-list {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 10px;
    background-color: #dcdcdc !important;
  }

  .application--dark {
    .rate-container {
      background-color: #454545;
    }

    .media-list {
      background-color: #454545 !important;
    }
  }

</style>
