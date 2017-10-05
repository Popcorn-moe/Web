<template>
  <div>
    <div class="news-page-banner" :style="{ 'background-image': `url(${news.cover})` }"></div>
    <v-container>
      <div class="news-page">
        <h1 class="uppercase title" v-html="news.name"></h1>
        <p>by {{ news.author.login }} on {{ news.posted_date.slice(0, 10) }}</p>
        <v-divider></v-divider>
        <div v-html="newsContent"></div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider } from 'vuetify/src/components'
import { VContainer, VFlex, VLayout } from 'vuetify/src/components/VGrid'
import marked from 'marked'
import gql from 'graphql-tag'

export default {
  name: "NewsPage",
  props: ['id'],
  data() {
    return {
      news: { author: { login: "EMPTY" }, content: "", posted_date: new Date().toISOString()}
    }
  },
  components: {
    VBtn,
    VIcon,
    VDivider,
    VContainer,
    VFlex,
    VLayout
  },
  computed: {
    newsContent: function () {
      return marked(this.news.content, { sanitize: true })
    }
  },
  apollo: {
    news: {
      query: gql`query ($id: ID!) {
        _news(id: $id) {
          name content author { login } cover posted_date
        }
      }`,
      variables() {
          return {
            id: this.id
          }
      },
      update: ({ _news }) => _news
    }
  }
}
</script>

<style lang="stylus">
    @import '../../stylus/main.styl';

    .news-page {
      .title {
        display: inline !important;
        font-size: 80px !important;
      }
    }

    .news-page-banner {
      width: 100%;
      height: 300px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #2f2f2f;
    }


</style>
