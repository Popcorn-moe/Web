<template>
    <div>
        <v-layout row wrap class="text-xs-center no-margin">
        <v-flex xs3>
            <v-btn icon @click.stop="$emit('input', false)">
            <v-icon>menu</v-icon>
            </v-btn>
        </v-flex>
        <v-flex offset-xs6 xs3>
            <v-btn icon @click.stop="$emit('close')">
            <v-icon>clear</v-icon>
            </v-btn>
        </v-flex>
        </v-layout>
        <v-list>
        <router-link
            v-for="notif in notifs"
            :key="notif.id"
            to="index"
            class="router-link"
        >
            <v-layout row>
            <v-flex xs12 class="notif-container">
                <v-layout row>
                <v-flex xs2>
                    <img v-bind:src="notif.cover" class="img"></v-list-tile-avatar>
                </v-flex>
                <v-flex xs10>
                    <div class="content">{{ notif.content }}</div>
                </v-flex>
                </v-layout>
            </v-flex>
            </v-layout>
        </router-link>
        </v-list>
    </div>
</template>

<script>
import { VBtn, VIcon } from '@/vuetify'
import Grid from 'vuetify/src/components/grid'

export default {
    data() {
        return {
            notifs : [
                {
                    id: "index",
                    cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
                    content: "Tel anime de merde est sorti zdzqdzq dz dqzd zd qzdzqdqz qzd qzdqzd qzd qzd zqdzqd qzd qzd qzdqzdqzdqzd qdqz dqzd"
                },
                {
                    id: "index",
                    cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
                    content: "Tel anime de merde est sorti"
                },
                {
                    id: "index",
                    cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
                    content: "Tel anime de merde est sorti"
                },
                {
                    id: "index",
                    cover: "https://media.kitsu.io/anime/poster_images/6589/large.jpg?1416428763",
                    content: "Tel anime de merde est sorti"
                }
            ]
        }
    },
    components: {
        ...Grid,
        VBtn,
        VIcon
    }
}
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .notif-container:hover {
    background-color: rgba(0,0,0,0.15);
  }

  .notif-container {
      padding: 6px !important;
      .img {
        padding-left: 10px;
        width: 50px;
        height: auto;
      }
      .content {
        text-align: justify;
        padding-left: 10px;
        padding-right: 10px;
        color: #4b4b4b !important;
      }
  }
</style>
