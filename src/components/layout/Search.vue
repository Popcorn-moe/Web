<template>
  <v-slide-x-transition>
    <div v-if="toggled">
      <v-toolbar
        floating
        dense
        class="search-toolbar"
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
      <v-list class="search-results" v-if="result.users.length || result.animes.length">
        <template v-if="result.users.length">
          <v-subheader inset v-t="'quick_search.users'"></v-subheader>
          <v-list-tile
            avatar
            v-for="user in result.users"
            :key="user.id"
            :to="{ name: 'Account', params: { userLogin: user.login, page: 'profile' } }"
            @click.stop="toggled = false"
          >
            <v-list-tile-avatar>
              <img :src="user.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.login }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.status }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider inset v-if="result.users.length && result.animes.length"></v-divider>
        <template v-if="result.animes.length">
          <v-subheader inset>Animes</v-subheader>
          <v-list-tile v-for="anime in result.animes" :key="anime.id" :to="{ name: 'Anime', params: { id: anime.id }}"  @click.stop="toggled = false" avatar>
            <v-list-tile-avatar>
              <img :src="anime.cover">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ anime.names[0] }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ anime.release_date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
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
	VDivider,
	VSubheader,
	VAvatar
} from "vuetify/es5/components";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileTitle,
	VListTileContent,
	VListTileAvatar,
	VListTileSubTitle
} from "vuetify/es5/components/VList";
import gql from "graphql-tag";

export default {
	name: "Search",
	data() {
		return {
			toggled: false,
			query: "",
			result: {
				users: [],
				animes: []
			}
		};
	},
	components: {
		VSlideXTransition,
		VBtn,
		VIcon,
		VTextField,
		VToolbar,
		VDivider,
		VSubheader,
		VAvatar,
		VList,
		VListGroup,
		VListTile,
		VListTileTitle,
		VListTileContent,
		VListTileAvatar,
		VListTileSubTitle
	},
	apollo: {
		result: {
			query: gql`
				query($name: String!) {
					users: searchUser(name: $name, limit: 2) {
						id
						login
						avatar
					}
					animes: searchAnime(name: $name, limit: 2) {
						id
						names
						cover
						release_date
					}
				}
			`,
			variables() {
				return {
					name: this.query || ""
				};
			},
			update: data => data
		}
	},
	i18n: {
		messages: {
			fr: {
				quick_search: {
					search: "Rechercher",
					users: "Utilisateurs"
				}
			},
			en: {
				quick_search: {
					search: "Search",
					users: "Users"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import '../../stylus/main'

  .search-toolbar {
    margin: 6px 8px 0 0;
  }

  .search-results {
    margin-right: 8px;
  }
</style>
