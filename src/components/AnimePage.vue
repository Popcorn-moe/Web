<template>
  <div>
    <div class="anime-page-banner" :style="{ 'background-image': anime.background }"></div>
    <v-container class="anime-page-container">
      <v-layout row wrap>
        <v-flex offset-xs1 xs7 class="anime-infos">
          <img class="anime-cover" :src="anime.cover">
          <h6 class="uppercase">{{ anime.names[0] }}</h6>
          <ul>
            <li v-for="author in anime.authors" :key="author.id">
              <div class="list-name">Auteur :</div>
              {{ author.name }}
            </li>
          </ul>
          <p>{{ anime.desc }}</p>
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
              <rate v-model="anime.rate"></rate>
            </div>
          </div>
          <media-list :anime="id"></media-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { VBtn, VIcon } from 'vuetify/src/components'
  import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'
  import Rate from './anime/Rate.vue'
  import MediaList from './media/MediaList.vue'
  import gql from 'graphql-tag'
  import { client } from '../graphql'

  export default {
    props: ['id'],
    data () {
      // Try from cache
      try { 
        const anime = client.readFragment({
          id: this.id,
          fragment: gql`
            fragment anime on Anime {
              names
              cover
              background
              authors { id name }
            }
          `,
        });
        if (anime)
          return { anime }
      } catch (e) { console.log(e) }
      // Query it
      client.query({
        query: gql`query ($id: ID!){
            anime (id: $id) {
              names
              cover
              background
              authors { id name }
            }
          }`,
        variables: {
          id: this.id
        }
      }).then(({ data: { anime } }) => this.anime = anime)
      return {
        anime: {}
      }
    },
    components: {
      VContainer,
      VFlex,
      VLayout,
      VBtn,
      VIcon,
      Rate,
      MediaList
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
  }

  .application--dark .anime-page-container {
    .rate-container {
      background-color: #454545;
    }
  }

</style>
