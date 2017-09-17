<template>
  <div>
    <div class="anime-page-banner"></div>
    <v-container class="anime-page-container">
      <v-layout row wrap>
        <v-flex offset-xs1 xs7 class="anime-infos">
          <img class="anime-cover" :src="cover">
          <h6 class="uppercase">Titre de l'anime</h6>
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div class="text-xs-center">
            <h6 class="uppercase">Trailer :</h6>
          </div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="main-color" block large light>
            <v-icon class="white--text">favorite</v-icon>
            S'ABONNER
          </v-btn>
          <div class="rate-container">
            <div class="text-xs-center">
              <h6>Note :</h6>
              <rate v-model="rate"></rate>
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
  import { VBtn, VIcon } from 'vuetify/src/components'
  import { VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle } from 'vuetify/src/components/VList'
  import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'
  import Rate from './anime/Rate.vue'

  export default {
    name: "anime",
    data ()
    {
      const medias = [];
      for (let i = 0; i < 5; i++) {
        medias.push(
          {
            active: i == 0,
            group: "Saison " + (i + 1),
            medias: [
              {
                name: "Episode 1"
              },
              {
                name: "Episode 2"
              },
              {
                name: "Episode 3"
              }
            ]
          }
        )
      }
      return {
        rate: 0,
        cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
        medias : medias
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
      VBtn,
      VIcon,
      Rate
    }
  }
</script>

<style lang="stylus">
  @import '../stylus/main.styl';

  .uppercase {
    text-transform: uppercase;
  }


  .anime-page-banner {
    width: 100%;
    height: 405px;
    background: black url(https://images6.alphacoders.com/505/thumb-1920-505441.jpg) center;
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

    .media-list {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 10px;
      background-color: #dcdcdc !important;
    }
  }

  .application--dark .anime-page-container {
    .rate-container {
      background-color: #454545;
    }

    .media-list {
      background-color: #454545 !important;
    }
  }

</style>
