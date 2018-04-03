<template>
	<v-slide-x-transition>
		<div v-if="toggled" class="search">
			<v-toolbar
				floating
				dense
			>
				<v-btn @click.stop="toggled = false" flat icon>
						<v-icon>arrow_back</v-icon>
				</v-btn>
				<v-text-field
					:label="$t('quick_search.search')"
					prepend-icon="search"
					hide-details
					single-line
					v-model="query"
				></v-text-field>
			</v-toolbar>
			<search-results class="result" :query="query" @close="toggled = false"></search-results>
		</div>
		<v-btn v-else @click.stop="toggled = true" fab class="main-color" small>
				<v-icon>search</v-icon>
		</v-btn>
	</v-slide-x-transition>
</template>

<script>
import { VSlideXTransition } from "vuetify/es5/components/transitions";
import {
	VBtn,
	VIcon,
	VTextField,
	VToolbar,
	VAvatar
} from "vuetify/es5/components";
import SearchResults from "./SearchResults";
import gql from "graphql-tag";

export default {
	name: "Search",
	data() {
		return {
			toggled: false,
			query: null
		};
	},
	components: {
		VSlideXTransition,
		VBtn,
		VIcon,
		VTextField,
		VToolbar,
		VAvatar,
		SearchResults
	},
	i18n: {
		messages: {
			fr: {
				quick_search: {
					search: "Rechercher"
				}
			},
			en: {
				quick_search: {
					search: "Search"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
	@import '../../stylus/main'

	.search {
		margin: 8px 8px 0 0;
		.toolbar {
			margin: 0;
		}
		.result {
			width: 303px;
		}
	}
</style>
