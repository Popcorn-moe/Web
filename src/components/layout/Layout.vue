<template>
    <div>
        <navbar :value="drawer" @input="toggleDrawer"></navbar>
        <v-btn v-if="!drawer" fab @click.stop="toggleDrawer(!drawer)" class="button-float main-color" small>
            <v-icon>menu</v-icon>
        </v-btn>
        <main>
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>
        </main>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from './Navbar'

export default {
    components: {
        Navbar
    },
    computed: mapGetters({
        drawer: 'drawer',
    }),
    methods: mapActions({
        toggleDrawer: 'toggleDrawer'
    })
}
</script>

<style lang="stylus">
  @import '../../stylus/main'

  .button-float {
    position: absolute !important;
    z-index: 1000;
  }
</style>
