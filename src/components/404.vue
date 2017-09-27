<template>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <div class="vertical-align">
          <v-card>
            <img v-if="(currGif = randomGif()).type === 'img'" :src="currGif.src">
            <iframe v-else-if="currGif.type === 'video'" v-type="text/html" :src="currGif.src" frameborder="0"/>

            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <h1 class="headline"> 404 !</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { VBtn, VIcon } from 'vuetify/src/components'
import { VCard, VCardTitle, VCardMedia } from 'vuetify/src/components/VCard'
import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'

export default {
  name: "NopPage",
  data() {
    return {
      gifs: [
        { src: "https://i.imgur.com/1A17LFL.gif", type: "img" },
        { src: "https://cdn.discordapp.com/attachments/349974957998080001/355086450699534336/unknown.png", type: "img" },
        { src: "https://images-ext-1.discordapp.net/external/dlIPdqpVNkz6YgwgmicyLPCE-IMHeg65sOa5P2RhgYI/https/rra.ram.moe/i/r12y82Xex.gif", type: "img" },
        { src: "http://www.youtube.com/embed/_NXrTujMP50", type: "video" }
      ],
      currGif: null,
    }
  },
  methods: {
    randomGif() {
      return this.gifs[Math.floor(Math.random() * this.gifs.length)]
    }
  },
  components: {
    VContainer,
    VFlex,
    VLayout,
    VCard,
    VCardTitle,
    VCardMedia,
    VBtn,
    VIcon
  }
}
</script>

<style lang="stylus">
  @import "../stylus/main.styl";

  .vertical-align {
    transform: translateY(calc(50vh - 50%));
    height: 100%;
    img {
      width: 100%;
      height: auto;
    }

    iframe {
      width: 100%;
      height: 400px;
    }
  }
</style>
