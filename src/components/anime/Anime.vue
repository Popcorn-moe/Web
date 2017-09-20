<template>
    <div class="anime text-xs-center">
      <router-link :to="{ name: 'Anime', params: { name: value.names[0] }}">
        <div class="cover-container">
          <img class="cover" :src="value.cover">
          <v-icon class="arrow">play_arrow</v-icon>
        </div>
        <h3 class="title">{{ value.names[0] }}</h3>
        <div class="infos">
            <div class="details">
                <address class="author"><a rel="author" :href="value.authors">{{ value.authors[0].name }}</a></address>
                <span> - </span>
                <time pubdate datetime="2011-08-28" title="Jul 8, 2012 to Dec 23, 2013">{{ 'RIP' || value.date.toISOString().split('T')[0] }}</time>
            </div>
            <rate class="rate" v-model="rate"></rate>
            <a class="description">Description</a>
        </div>
      </router-link>
    </div>
</template>

<script>
import { VIcon } from 'vuetify/src/components'
import Rate from './Rate'

export default {
  props: ['value'],
  data() {
      return {
          rate: 0
      }
  },
  components: {
      VIcon,
      Rate
  }
}

</script>

<style lang="stylus">
  @import '../../stylus/main'

    .anime {
        width: $anime.width + $anime.padding * 2;
        padding: $anime.padding;
        display: inline-block;
        position: relative;
        margin: $anime.margin;
        transition: transform .3s ease-out;

        a {
            text-decoration: none
        }

        &:hover {
            z-index: 2;
            .infos {
                opacity: 1;
            }

            width: $anime.width + $anime.padding * 2;
            transform: translateY(-10px);
            cursor: pointer;
            @extend .elevation-2
        }

        .cover {
          padding: $anime.img-border;
          height: auto;
          width: $anime.width;
          height: $anime.img-height;
        }

        .cover-container:hover {
            .cover {
              background-color: $main-color;
            }

            .arrow {
              display: block;
            }
        }

        .arrow {
          display: none;
          position: absolute;
          top: $anime.padding + $anime.img-height * 0.5;
          left: $anime.padding + $anime.width * 0.5;
          transform: translate(-50%, -50%);
          font-size: 6rem;
          color: white !important;
        }

        .title {
            font-size: 14px !important;
            margin: 1px;
        }

        .details * {
            display: inline;
            font-size: 12px;
            text-decoration: none;
            color: $grey.base;
        }

        .description
        {
            background-color: $grey.lighten-3;
            color: $main-color;
            display: block;
            margin: -($anime.padding);
            margin-top: 0;
            padding: $anime.padding * 0.5;
        }

        .rate {
            background-color: $material-light.background;
        }

        .infos {
            opacity: 0;
        }
    }

    .application--dark .anime {
        .title {
            color: white;
        }

        .description {
            background-color: rgb(45, 45, 45);
        }

        &:hover, .rate {
            background-color: #1C1C1C;
        }
    }
</style>
