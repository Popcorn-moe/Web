<template>
  <div>
    <v-carousel class="white--text">
      <!--v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item!-->
      <v-carousel-item src="https://images6.alphacoders.com/505/thumb-1920-505441.jpg">News 1</v-carousel-item>
      <v-carousel-item src="https://images4.alphacoders.com/706/thumb-1920-706365.png">News 2</v-carousel-item>
      <v-carousel-item src="https://ib3.hulu.com/show_key_art/12104?size=1600x600&region=US">News 3</v-carousel-item>
    </v-carousel>
    <v-container fluid class="text-xs-center">
      <h5>Derniers Episodes</h5>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<style>

</style>
