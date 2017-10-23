<template>
  <div class="anime-list">
        <div class="animes" :style="{ left: -(animeSize * index) + 'px'}">
            <anime 
                v-for="(anime, i) in value" 
                :key="anime.id"
                v-if="i <= maxIndex + elemsPerLine"
                :value="anime"></anime>
        </div>
        <div class="shadow"></div>
        <v-btn class="nav-button nav-left main-color--text" v-if="index > 0" fab @click="index--">
            <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn class="nav-button nav-right main-color--text" v-if="index < value.length" fab @click="++index > maxIndex ? ++maxIndex : 1">
            <v-icon large>keyboard_arrow_right</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify/es5/components'
import Anime from './Anime'

export default {
  props: {
    value: Array
  },
  data() {
    return {
        index: 0,
        maxIndex: 0,
        animeSize: 184, // Anime width + 2 * padding + 2 * margin in px
        elemsPerLine: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.update)
    this.update()
  },
  destroyed() {
    window.removeEventListener('resize', this.update)
  },
  methods: {
    update() {
        this.elemsPerLine = Math.ceil(document.body.offsetWidth / this.animeSize)
    }
  },
  components: {
      VBtn,
      VIcon,
      Anime
  }
}
</script>


<style lang="stylus">
  @import '../../stylus/main'

  .anime-list {
    overflow-x: hidden;
    white-space: nowrap;
    position: relative;
    padding: 10px;
    margin-bottom: -50px;

    .animes {
        position: relative;
        transition: left 500ms;
    }

    .nav-button {
        position: absolute;
        top: $anime.img-height * 0.5 - $anime.img-border;
        transform: translateX(-50%);
        z-index: 3;

        &.nav-left {
            left: 28px;
        }

        &.nav-right {
            right: -28px;
        }
    }

    .shadow {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        background: linear-gradient(to right, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 7px, $material-light.background 100%);
        pointer-events: none;
    }
  }

  .application--dark .anime-list {
    .shadow {
        background: linear-gradient(to right, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 7px, $material-dark.background 100%);
    }
  }

</style>