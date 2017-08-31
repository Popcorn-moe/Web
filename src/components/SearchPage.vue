<template>
  <div>
    <v-container class="page-container">
      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-text-field name="input-1" label="Search" id="search-input" hide-details single-line append-icon="search"></v-text-field>
          <div class="text-xs-center">
            <a @click.stop="show_more = !show_more">
              {{ show_more ? "Moins d'options" : "Plus d'options" }}
            </a>
          </div>
        </v-flex>
      </v-layout>
      <div v-if="show_more">
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
            <v-text-field name="input-1" label="Author" single-line></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex offset-xs4 xs4>
            <v-text-field name="input-1" label="Année" single-line></v-text-field>
          </v-flex>
        </v-layout>
      </div>
      <v-layout row wrap>
        <v-flex class="text-xs-center" xs12>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
          <anime :value="{ name: 'test1', poster: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763', author: { name: 'Test author' }, date: new Date() }"></anime>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { VTextField, VSelect } from '@/vuetify'
import Grid from 'vuetify/src/components/grid'
import Anime from './anime/Anime.vue'

export default {
  name: "search",
  data () {
    return {
        show_more: false
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

  #search-input {

  }
</style>
