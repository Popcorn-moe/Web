<template>
  <div>
    <div class="banner"></div>
    <v-container>
      <v-layout row wrap>
        <v-flex offset-xs1 xs7>
          <div class="text-xs-center">
            <h6 class="uppercase">Titre de l'anime</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
          <v-list>
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
  import { VBtn, VIcon } from '@/vuetify'
  import Lists from 'vuetify/src/components/lists'
  import Grid from 'vuetify/src/components/grid'
  import Rate from './anime/Rate.vue'

  export default {
    name: "index",
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
          medias : medias
      }
    },
    components: {
      ...Grid,
      VBtn,
      VIcon,
      ...Lists,
      Rate
    }
  }
</script>

<style lang="stylus">
  @import '../stylus/main.styl';

  .uppercase {
    text-transform: uppercase;
  }

  p {
    padding-left: 15px;
    padding-right: 15px;
  }

  .rate .star {
    color: $grey.lighten-1 !important;
    &.active {
       color: $yellow.base !important;
     }
  }

  .rate-container {
    background-color: #dcdcdc;
    margin-top: 15px;
    padding: 30px;
  }

  .banner {
    width: 100%;
    height: 405px;
    margin-bottom: 30px;
    background: black url(https://images6.alphacoders.com/505/thumb-1920-505441.jpg) center;
  }

  .list {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 10px;
    background-color: #dcdcdc !important;
  }

  .application--dark {
    .rate-container {
      background-color: #454545;
    }
  }

</style>
