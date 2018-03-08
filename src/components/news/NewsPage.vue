<template>
  <div>
    <div class="news-page-banner" :style="{ 'background-image': `url(${news.cover})` }"></div>
    <v-container>
      <div class="news-page">
        <h1 class="uppercase title" v-html="news.name"></h1>
        <p v-t="{ path: 'news.by_author_on_date', args: { author: news.author.login, date: news.posted_date }}"></p>
        <v-divider></v-divider>
        <div v-html="newsContent"></div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider } from "vuetify/es5/components";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import marked from "marked";
import gql from "graphql-tag";

export default {
	name: "NewsPage",
	props: ["id"],
	data() {
		return {
			news: {
				author: { login: "EMPTY" },
				content: "",
				posted_date: new Date().toISOString()
			}
		};
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
		newsContent() {
			return marked(this.news.content, { sanitize: true });
		}
	},
	apollo: {
		news: {
			query: gql`
				query($id: ID!) {
					_news(id: $id) {
						name
						content
						author {
							login
						}
						cover
						posted_date
					}
				}
			`,
			variables() {
				return {
					id: this.id
				};
			},
			update: ({ _news }) => {
				console.log(_news);
				return _news;
			}
		}
	},
	i18n: {
		messages: {
			fr: {
				news: {
					by_author_on_date: "Publié par {author} le {date}"
				}
			},
			en: {
				news: {
					by_author_on_date: "By {author} on {date}"
				}
			}
		}
	}
};
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
