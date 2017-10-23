<template>
  <div>
    <v-container class="page-container" grid-list-md>
      <v-layout row wrap>
        <v-flex offset-xs3 xs6>
          <v-text-field name="search" :label="$t('search.search')" hide-details single-line append-icon="search"></v-text-field>
          <div class="text-xs-center">
            <transition-group name="fade-transition">
              <v-chip v-for="tag in tags" :key="tag.id" class="white--text" :style="{ 'background-color': tag.color }" v-if="tag.value" @input="tag.value = false" close>
                {{ tag.name }}
              </v-chip>
            </transition-group>
          </div>
          <div class="text-xs-center">
            <a class="search-options-button" @click.stop="showMore = !showMore" v-t="showMore ? 'search.less_options' : 'search.more_options'"></a>
          </div>
        </v-flex>
      </v-layout>
      <div :class="{ 'search-options-body': true, 'search-options-body-hidden': !showMore }">
        <v-layout row wrap>
          <v-flex offset-xs1 xs2>
            <v-btn color="primary" dark @click.native.stop="dialog_tags = true" small block top v-t="'search.add_tags'"></v-btn>
            <v-dialog v-model="dialog_tags" max-width="50%">
              <v-card>
                <v-card-title class="headline" v-t="'search.add_tags'"></v-card-title>
                <div class="v-card__text">
                  <v-chip v-for="tag in tags" :key="tag.id"
                    :class="{ 'white--text': tag.value }"
                    :style="{ 'background-color': tag.value ? tag.color : null }"
                    @click.stop="tag.value = !tag.value">{{ tag.name }}
                  </v-chip>
                </div>
                <div class="v-card__actions">
                  <v-spacer></v-spacer>
                  <v-btn class="green--text darken-1" flat="flat" @click.native="dialog_tags = false" v-t="'search.finish'"></v-btn>
                </div>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs2>
            <v-select :label="$t('search.sort_by')" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-select :label="$t('search.status')" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-select :label="$t('search.type')" bottom></v-select>
          </v-flex>
          <v-flex xs2>
            <v-text-field :label="$t('search.author')" single-line></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex offset-xs4 xs4>
            <v-text-field :label="$t('search.year')" single-line></v-text-field>
          </v-flex>
        </v-layout>
      </div>
      <v-layout row wrap>
        <v-flex v-for="result in results" :key="result.id">
          <anime :value="result"></anime>
        </v-flex>
        <v-flex class="filler" v-for="i in 24" :key="i"></v-flex>
      </v-layout>
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
  },
  i18n: {
    messages: {
      fr: {
        search: {
          more_options: 'Plus d\'options',
          less_options: 'Moins d\'options',
          add_tags: 'Ajouter des tags',
          finish: 'Terminer',
          search: 'Rechercher',
          sort_by: 'Trier par',
          status: 'Status',
          type: 'Type',
          author: 'Autheur',
          year: 'Année'
        }
      },
      en: {
        search: {
          more_options: 'More options',
          less_options: 'Less options',
          add_tags: 'Add tags',
          finish: 'Ok',
          search: 'Search',
          sort_by: 'Sort by',
          status: 'Status',
          type: 'Type',
          author: 'Author',
          year: 'Year'
        }
      }
    }
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

  .filler {
    width: $anime.width + $anime.padding * 2;
  }
</style>
