<template>
  <div class="comment">
    <v-layout row wrap>
      <v-flex xs1>
        <img :src="value.user.avatar">
      </v-flex>
      <v-flex xs11>
        <div class="comment-container">
          <div class="comment-content">
              <div class="username">
              {{ value.user.login }}
              <h6 class="date">{{ value.posted }}</h6>
            </div>
            <p v-html="value.content"></p>
            <div v-if="!isReply">
              <v-divider></v-divider>
              <div v-if="!response">
                <v-layout row>
                  <v-flex xs3>
                    <div class="show_more">
                      <a @click.stop="toggleMore()" v-if="value.replies_count > 0">
                        Show {{ show_more ? "less" : "more" }} ({{ value.replies_count }})
                        <v-icon>{{ `keyboard_arrow_${show_more ? 'up' : 'down'}` }}</v-icon>
                      </a>
                    </div>
                  </v-flex>
                  <v-flex offset-lg7 lg2>
                    <v-btn rigth small block flat class="main-color--text" name="reply" @click.stop="response = true">Répondre</v-btn>
                  </v-flex>
                </v-layout>
              </div>
              <div v-else>
                <div v-if="preview" v-html="markdownResponse"></div>
                <v-text-field
                  v-else
                  v-model="responseText"
                  @focus="needAuth()"
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
                    <v-btn small block flat class="main-color--text" @click.stop="response = false">Annuler</v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn small block class="main-color" @click.stop="reply()">Répondre</v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </div>
          <v-progress-linear :indeterminate="true" height="2" v-if="loadMore"></v-progress-linear>
        </div>
      </v-flex>
    </v-layout>
    <div class="response">
      <comment v-for="reply in replies" :value="reply" :key="reply.id" :isReply="true" v-if="show_more"></comment>
    </div>
  </div>
</template>

<script>
import {
	VBtn,
	VDivider,
	VTextField,
	VIcon,
	VProgressLinear
} from "vuetify/es5/components";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import marked from "marked";
import gql from "graphql-tag";
import clone from "clone";

export default {
	name: "comment",
	data() {
		return {
			response: false,
			responseText: "",
			preview: false,
			show_more: false,
			loadMore: false,
			replies: []
		};
	},
	props: {
		value: Object,
		isReply: Boolean
	},
	methods: {
		needAuth() {
			if (!this.$store.state.isAuth) this.$router.push({ name: "Login" });
		},
		toggleMore() {
			if (!this.show_more) {
				this.loadMore = true;
				this.$apollo.queries.replies.refetch();
			}
			this.show_more = !this.show_more;
		},
		reply() {
			this.$apollo
				.query({
					query: gql`
						query reply($id: ID!, $content: String!) {
							comment(id: $id) {
								reply(content: $content) {
									id
									content
									posted
									user {
										login
										avatar
									}
								}
								replies_count
							}
						}
					`,
					variables: {
						id: this.value.id,
						content: this.responseText
					}
				})
				.then(({ data: { comment: { reply, replies_count } } }) => {
					this.replies.push(reply);
					this.value.replies_count = replies_count + 1;
				});
			this.response = false;
			this.responseText = null;
		}
	},
	watch: {
		replies() {
			if (this.loadMore && this.replies.length > 0) {
				this.loadMore = false;
				this.show_more = true;
			}
		}
	},
	computed: {
		markdownResponse() {
			return marked(this.responseText, { sanitize: true });
		}
	},
	apollo: {
		replies: {
			query: gql`
				query comment($id: ID!) {
					comment(id: $id) {
						replies {
							id
							content
							posted
							user {
								login
								avatar
							}
						}
					}
				}
			`,
			variables() {
				return {
					id: this.value.id
				};
			},
			skip() {
				return !this.loadMore;
			},
			update: ({ comment: { replies } }) => clone(replies)
		}
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VDivider,
		VBtn,
		VTextField,
		VIcon,
		VProgressLinear
	}
};
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .comment {

    img {
      height: 60px;
      width: 60px;
      float: right;
      border-radius 50%;
    }

    .comment-container {
      border-radius: 5px;
      margin-bottom 10px;
      margin-left: 10px;
      
      .show_more {
        line-height 40px;
      }

      .comment-content {
        padding: 20px 20px 0 25px;
        padding-bottom 5px;
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
    }

    .response {
      padding-left: 45px;
      .show_more {
        display inline
        padding-left 35px;
      }
    }

  }

  .application.theme--dark .comment .comment-container {
    background-color: #1C1C1C;
  }

  .application.theme--light .comment .comment-container {
    background-color: #f0f0f0;
  }
</style>
