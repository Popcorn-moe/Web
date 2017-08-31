<template>
  <div class="comment">
    <v-layout row wrap>
      <v-flex xs2>
        <img :src="icon">
      </v-flex>
      <v-flex xs10>
        <div class="comment-container">
          <div class="username">
            {{ user }}
            <h6>{{ date }}</h6>
          </div>
          <p v-html="content"></p>
          <v-divider></v-divider>
          <div class="text-xs-right">
            <v-btn small flat class="main-color--text" name="reply">Répondre</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <div class="response">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { VBtn, VDivider } from '@/vuetify';
  import Grid from 'vuetify/src/components/grid';

  export default {
    props     : {
      user   : String,
      date   : String,
      content: String,
      icon   : String
    },
    components: {
      ...Grid,
      VDivider,
      VBtn
    }
  };

</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .comment {

    img {
      height: auto;
      width: 80px;
      float: right;
      border-radius 50%;
    }

    .comment-container {
      background-color: #f0f0f0;
      min-height: 120px;
      border-radius: 5px;
      margin-bottom 10px;
      padding: 20px 20px 0 25px;

      .username {
        width: 100%;

        h6 {
          display: inline-block;
          width: auto;
          font-size: 10px;
          color: #d5d5d5
        }
      }

      .divider {
        margin: 3px;
      }

      /*&:before {
        content: '';
        display: inline-block
        position: absolute
        width: 20px;
        height: 20px;
        border: 20px solid transparent;
        vertical-align: middle;
        border-color: transparent #007bff transparent transparent;
        left: -60px;
      }*/
    }

    .response {
      padding-left: 45px;
    }

  }
</style>
