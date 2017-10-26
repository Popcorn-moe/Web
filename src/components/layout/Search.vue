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
          label="Search"
          prepend-icon="search"
          hide-details
          single-line
        ></v-text-field>
      </v-toolbar>
      <v-list class="search-results">
        <v-subheader inset>Users</v-subheader>
        <v-list-tile avatar v-for="item in users" :key="item.title">
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-subheader inset>Animes</v-subheader>
        <v-list-tile v-for="item in animes" :key="item.title" avatar>
          <v-list-tile-avatar>
            <img :src="item.banner">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <v-btn v-else @click.stop="toggled = true" fab class="main-color" small>
        <v-icon>search</v-icon>
    </v-btn>
  </v-slide-x-transition>
</template>

<script>
import { VSlideXTransition } from 'vuetify/es5/components/transitions'
import { VBtn, VIcon, VTextField, VToolbar, VDivider, VSubheader, VAvatar } from 'vuetify/es5/components'
import { VList, VListGroup, VListTile, VListTileTitle, VListTileContent, VListTileAvatar, VListTileSubTitle } from 'vuetify/es5/components/VList'

export default {
  name: 'Search',
  data() {
    return {
      toggled: false,
      users: [
        { title: 'Loucassoulé', subtitle: 'Le bon cassoulé ça mere', avatar: 'https://cdn.discordapp.com/avatars/175646285456474112/b959f0e240c9653d91bae27be8d9eecd.png' },
        { title: 'Xx_SkyBeast_xX', subtitle: 'Watching a loli', avatar: 'https://cdn.discordapp.com/avatars/151023528446001152/9792d2aed4c2a5d08ceec3588d2b3396.png' },
        { title: 'DeltaEmo', subtitle: 'J\'aime les licornes', avatar: 'https://cdn.discordapp.com/avatars/107942335274307584/a_0e66b32131625a6c3a82be6ccd012b7c.png' }
      ],
      animes: [
        { title: 'Sword Art Online', subtitle: 'Jan 20, 2014', banner: 'https://api.popcorn.moe/uploads/029fa65080116a9414b684ab61f86a6e.jpeg' }
      ]
    }
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
  }
}
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
