<template>
    <v-container grid-list-md>
      <v-layout>
        <v-flex xs4 v-for="($new, i) in news" :key="i">
          <v-card>
            <v-card-media src="https://frenchemployerbranding.files.wordpress.com/2015/12/candidat-licorne.png?w=300" height="150px"></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" v-html="$new.name"></h3>
              </div>
            </v-card-title>
            <div class="card__action">
              <v-btn :to="{ name: 'NewsPage', params: { id: $new.id }}" primary flat>Voir plus</v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { VBtn, VIcon } from 'vuetify/src/components'
import { VCard, VCardTitle, VCardMedia } from 'vuetify/src/components/VCard'
import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'

export default {
  name: "NewsList",
  data() {
    return {
        news: []
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
  },
  apollo: {
    news: {
      query: gql`{ news { id name author { login } content }}`,
      update: ({ news }) => news
    }
  }
}
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";
</style>
