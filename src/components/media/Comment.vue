<template>
  <div class="comment">
    <v-layout row wrap>
      <v-flex xs1>
        <img :src="value.icon">
      </v-flex>
      <v-flex xs11>
        <div class="comment-container">
          <div class="username">
            {{ value.user }}
            <h6 class="date">{{ value.date }}</h6>
          </div>
          <p v-html="value.content"></p>
          <v-divider></v-divider>
          <div v-if="!response" class="text-xs-right">
            <v-btn rigth small flat class="main-color--text" name="reply" @click.stop="response = true">Répondre</v-btn>
          </div>
          <div v-else>
            <div v-if="preview" v-html="markdownResponse"></div>
            <v-text-field
              v-else
              v-model="responseText"
              multi-line
              auto-grow
              rows="1"
              hideDetails
            >
            </v-text-field>
            <v-layout row>
              <v-flex xs1>
              <v-btn flat icon :class="{'main-color--text': preview}" @click.stop="preview = !preview">
                <v-icon v-html="preview ? 'visibility_off' : 'visibility'"></v-icon>
              </v-btn>
              </v-flex>
              <v-flex xs2 offset-xs7>
                <v-btn small flat class="main-color--text" @click.stop="response = false">Annuler</v-btn>
              </v-flex>
              <v-flex xs2>
                <v-btn small class="main-color">Répondre</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <div class="response" v-if="value.response">
      <comment :value="value.response"></comment>
    </div>
  </div>
</template>

<script>
import { VBtn, VDivider, VTextField, VIcon } from "vuetify/es5/components";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import marked from "marked";

export default {
	name: "comment",
	data() {
		return {
			response: false,
			responseText: "",
			preview: false
		};
	},
	props: {
		value: Object
	},
	computed: {
		markdownResponse() {
			return marked(this.responseText, { sanitize: true });
		}
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VDivider,
		VBtn,
		VTextField,
		VIcon
	}
};
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .comment {

    img {
      height: auto;
      width: 60px;
      float: right;
      border-radius 50%;
    }

    .comment-container {
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
          color: #adadad
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

  .application.theme--dark .comment .comment-container {
    background-color: #1C1C1C;
  }

  .application.theme--light .comment .comment-container {
    background-color: #f0f0f0;
  }
</style>
