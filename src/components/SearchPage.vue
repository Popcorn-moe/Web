<template>
  <div>
    <v-container class="page-container" grid-list-md>
      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-text-field name="search" label="Search" hide-details single-line append-icon="search"></v-text-field>
          <div class="text-xs-center">
            <transition-group name="fade-transition">
              <v-chip v-for="tag in tags" :key="tag.id" class="white--text" :style="{ 'background-color': tag.color }" v-if="tag.value" @input="tag.value = false" close>
                {{ tag.name }}
              </v-chip>
            </transition-group>
          </div>
          <div class="text-xs-center">
            <a class="search-options-button" @click.stop="showMore = !showMore">
              {{ showMore ? "Moins d'options" : "Plus d'options" }}
            </a>
          </div>
        </v-flex>
      </v-layout>
      <div :class="{ 'search-options-body': true, 'search-options-body-hidden': !showMore }">
        <v-layout row wrap>
          <v-flex offset-xs1 xs2>
            <v-btn color="primary" dark @click.native.stop="dialog_tags = true" small block top>Ajouter des Tags</v-btn>
            <v-dialog v-model="dialog_tags" max-width="50%">
              <v-card>
                <v-card-title class="headline">Ajouter des tags</v-card-title>
                <div class="v-card__text">
                  <v-chip v-for="tag in tags" :key="tag.id"
                    :class="{ 'white--text': tag.value }"
                    :style="{ 'background-color': tag.value ? tag.color : null }"
                    @click.stop="tag.value = !tag.value">{{ tag.name }}
                  </v-chip>
                </div>
                <div class="v-card__actions">
                  <v-spacer></v-spacer>
                  <v-btn class="green--text darken-1" flat="flat" @click.native="dialog_tags = false">Terminer</v-btn>
                </div>
              </v-card>
            </v-dialog>
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
        <anime v-for="result in results" :key="result.id" :value="result"></anime>
      </div>
    </v-container>
  </div>


</template>

<script>
import { VTextField, VSelect, VBtn, VDialog, VChip } from 'vuetify/es5/components'
import { VCard, VCardTitle } from 'vuetify/es5/components/VCard'
import { VContainer, VFlex, VLayout, VSpacer } from 'vuetify/es5/components/VGrid'
import Anime from './anime/Anime.vue'
import gql from 'graphql-tag'

export default {
  name: "search",
  data () {
    return {
      showMore: false,
      dialog_tags: false,
      tags: []
    }
  },
  computed: {
    results() {
      const array = [];
      for(let i = 0; i < 50; i++) {
        array.push({
          id: i,
          names: ['test' + i],
          authors: [{ name: 'Test author' }],
          cover: 'https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763'
        })
      }
      return array
    }
  },
  apollo: {
    tags: {
      query: gql`{ tags { id name desc color } }`,
      update: ({ tags }) => tags.map(tag => Object.assign({}, tag, { value: false }))
    }
  },
  components: {
    VContainer,
    VFlex,
    VLayout,
    VSpacer,
    VTextField,
    VSelect,
    VDialog,
    VCard,
    VCardTitle,
    VBtn,
    Anime,
    VChip
  }
}
</script>

<style lang="stylus">
  @import '../stylus/main'
  .page-container {
    padding-top: 30px;

    .chip:focus {
      box-shadow: none;
    }
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
