<template>
  <div>
    <v-container class="page-container">
      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-text-field name="search" label="Search" hide-details single-line append-icon="search"></v-text-field>
          <div class="text-xs-center">
            <a class="search-options-button" @click.stop="showMore = !showMore">
              {{ showMore ? "Moins d'options" : "Plus d'options" }}
            </a>
          </div>
        </v-flex>
      </v-layout>
      <div :class="{ 'search-options-body': true, 'search-options-body-hidden': showMore }">
        <v-layout row wrap>
          <v-flex offset-xs1 xs2>
            <v-select label="Tags" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-select label="Trier par" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-select label="Status" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-select label="Type" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-text-field name="author" label="Author" single-line></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex offset-xs4 xs4>
            <v-text-field name="year" label="Année" single-line></v-text-field>
          </v-flex>
        </v-layout>
      </div>
      <div class="text-xs-left">
        <anime v-for="result in results" :key="result.name" :value="result"></anime>
      </div>
    </v-container>
  </div>
</template>

<script>
import { VTextField, VSelect } from '@/vuetify'
import Grid from 'vuetify/src/components/grid'
import Anime from './anime/Anime.vue'
import AnimeModel from '@/models/Anime'

export default {
  name: "search",
  data () {
    return {
        showMore: false
    }
  },
  computed: {
    results() {
      const array = []
      for(let i = 0; i < 50; i++) {
        array.push(new AnimeModel('test' + i, { name: 'Test author' }, new Date(), 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763'))
      }
      return array
    }
  },
  components: {
    ...Grid,
    VTextField,
    VSelect,
    Anime
  }
}
</script>

<style lang="stylus">
  @import '../stylus/main'
  .page-container {
    padding-top: 30px;
  }

  .search-options-button {
    cursor: pointer;
    padding: 5px;
  }

  .search-options-body {
    max-height: 175px;
    transition: max-height .3s;

    &-hidden {
      max-height: 0;
      overflow: hidden;
    }
  }
</style>
