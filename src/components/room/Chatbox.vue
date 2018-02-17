<template>
  <div>
    <v-layout row wrap class="chat-box">
      <v-flex xs12 sm12 md6 class="my-3">
        <v-card color="grey lighten-4" flat height="200px">
          <v-toolbar>
            <div class="toolbar__title">Chat</div>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list class="list-messages">
            <template>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <div class="list__tile__title">Bla</div>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">more_vert</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <template>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <div class="list__tile__title">Bla</div>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">more_vert</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <template>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <div class="list__tile__title">Bla</div>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">more_vert</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <template>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <div class="list__tile__title">Bla</div>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">more_vert</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
          <v-toolbar>
            <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
            <v-btn icon>
              <v-icon>send</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { VIcon, VBtn, VAvatar, VTextField } from "vuetify/es5/components";
import { VToolbar, VToolbarSideIcon } from "vuetify/es5/components/VToolbar";
import { VCard } from "vuetify/es5/components/VCard";
import {
	VContainer,
	VFlex,
	VLayout,
	VSpacer
} from "vuetify/es5/components/VGrid";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileContent
} from "vuetify/es5/components/VList";

export default {
	name: "chatBox",
	data() {
		return {};
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VSpacer,
		VCard,
		VIcon,
		VToolbar,
		VToolbarSideIcon,
		VBtn,
		VList,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VAvatar,
		VTextField
	}
};
</script>

<style lang="stylus">
  @import '../stylus/main'

  .chat-box {
    .list-messages {
      height: 500px;
      overflow-y: auto;
    }
  }
</style>
