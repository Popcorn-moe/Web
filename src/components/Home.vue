<template>
  <div>
    <v-carousel class="white--text">
      <!--v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item!-->
      <v-carousel-item src="https://images6.alphacoders.com/505/thumb-1920-505441.jpg">News 1</v-carousel-item>
      <v-carousel-item src="https://images4.alphacoders.com/706/thumb-1920-706365.png">News 2</v-carousel-item>
      <v-carousel-item src="https://ib3.hulu.com/show_key_art/12104?size=1600x600&region=US">News 3</v-carousel-item>
    </v-carousel>
    <div class="text-xs-center">
      <h3 class="anime-list-title">Derniers Episodes</h3>
      <anime-list :value="animes"></anime-list>
      <h3 class="anime-list-title">Derniers trailers</h3>
      <anime-list :value="animes"></anime-list>
    </div>
  </div>
</template>

<script>
import Carousel from 'vuetify/src/components/carousel'
import AnimeList from './anime/AnimeList'
import Anime from '@/models/Anime'

export default {
  name: 'hello',
  data () {
    const animes = [];
    for (let i = 0; i < 100; i++) {
      animes.push(
        new Anime('Sword Art Online', { name: 'Genco', link: '' }, new Date(), 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763')
      )
    }
    return {
      animes
    }
  },
  components: {
    AnimeList,
    ...Carousel
  }
}
</script>

<style lang="stylus">
  @import '../stylus/main'
  
  .anime-list-title {
    margin: 0;
    font-size: 20px;
  }
</style>
