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
  import { VBtn, VDivider } from 'vuetify/es5/components';
  import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid';

  export default {
    props: {
      user: String,
      date: String,
      content: String,
      icon: String
    },
    components: {
      VContainer,
      VFlex,
      VLayout,
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
      margin-left: 10px;
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
    }

    .response {
      padding-left: 45px;
    }

  }

  .application--dark .comment .comment-container {
    background-color: #1C1C1C;
  }
</style>
