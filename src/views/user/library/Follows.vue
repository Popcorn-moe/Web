<template>
  <div class="library-follows" v-if="user">
    <v-list class="animes elevation-2">
      <div v-for="anime in animeFollows" :key="anime.id">
        <v-list-tile class="anime">
          <img :src="anime.cover.normal">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ anime.names[0] }}
              <v-btn icon small><v-icon>remove_red_eye</v-icon></v-btn>
              <v-btn icon small right><v-icon>clear</v-icon></v-btn>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="anime.desc"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { VBtn, VIcon, VDivider } from "vuetify";

import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle,
	VListTileSubTitle
} from "vuetify/es5/components/VList";
import gql from "graphql-tag";

export default {
	name: "library-follows",
	props: ["userLogin"],
	components: {
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VListTileSubTitle,
		VDivider,
		VBtn,
		VIcon
	},
	data() {
		return {
			me: null,
			user: null
		};
	},
	computed: {
		isMe() {
			return this.me && this.user.id === this.me.id;
		},
		animeFollows() {
			return this.user.animeFollows;
		}
	},
	apollo: {
		user: {
			query() {
				return gql`
					query user($name: String!) {
						user(name: $name) {
							id
							animeFollows {
								id
								names
								desc
								cover {
									normal
								}
							}
						}
					}
				`;
			},
			variables() {
				return {
					name: this.userLogin
				};
			},
			skip() {
				return !this.userLogin || this.me === false;
			},
			update: ({ user }) => user
		},
		me: {
			query: gql`
				{
					me {
						id
					}
				}
			`,
			update: ({ me }) => me
		}
	}
};
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl'


  .library-follows {
    .animes {
      padding-bottom 0px
    }

    .anime  {
      padding-bottom: 8px;
      .list__tile {
        height auto !important
        align-items initial !important;
        
        img {
          padding-top 8px;
          height 120px;
        }
      }

      .list__tile__title {
        height auto;
        font-size 22px
      }

      .list__tile__content {
        padding-left: 15px;
      }

      .list__tile__sub-title {
        white-space: normal !important
        display -webkit-box 
        -webkit-line-clamp 3
        -webkit-box-orient vertical
      }
    }
  }
</style>
