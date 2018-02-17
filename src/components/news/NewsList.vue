<template>
    <v-container grid-list-md>
      <v-layout>
        <v-flex xs4 v-for="($new, i) in news" :key="i">
          <v-card>
            <v-card-media :src="$new.cover" height="150px"></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" v-html="$new.name"></h3>
              </div>
            </v-card-title>
            <div class="card__action">
              <v-btn :to="{ name: 'NewsPage', params: { id: $new.id }}" color="primary" flat v-t="'news.see_more'"></v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import gql from "graphql-tag";
import { VBtn, VIcon } from "vuetify/es5/components";
import { VCard, VCardTitle, VCardMedia } from "vuetify/es5/components/VCard";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";

export default {
	name: "NewsList",
	data() {
		return {
			news: []
		};
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VCard,
		VCardTitle,
		VCardMedia,
		VBtn,
		VIcon
	},
	apollo: {
		news: {
			query: gql`
				{
					news {
						id
						name
						author {
							login
						}
						content
						cover
					}
				}
			`,
			update: ({ news }) => news
		}
	},
	i18n: {
		messages: {
			fr: {
				news: {
					see_more: "Voir plus"
				}
			},
			en: {
				news: {
					see_more: "See More"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";
</style>
