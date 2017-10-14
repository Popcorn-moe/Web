<template>
    <div>
        <navbar :value="drawer" @input="toggleDrawer"></navbar>
        <v-btn v-if="!drawer" fab @click.stop="toggleDrawer(!drawer)" class="button-float main-color" small>
            <v-icon>menu</v-icon>
        </v-btn>
        <main>
            <v-content>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-content>
        </main>
        <floating
            v-if="!videoPlayer.destroyed && (videoPlayer.owner === null || videoPlayer.owner === 'floating' ) && !$route.meta.hasPlayer"
            width="400px"
            :initial="{ 'bottom': '5px', 'right': '5px' }"
            @close="videoPlayer.destroy()"
        >
            <video-player owner='floating'></video-player>
        </floating>
    </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify/es5/components'
import { VContent, VContainer } from 'vuetify/es5/components/VGrid'
import { VSlideYTransition } from 'vuetify/es5/components/transitions'
import { mapGetters, mapActions } from 'vuex'
import Navbar from './navbar/Navbar'
import Floating from '../Floating'
import VideoPlayer, { videoPlayer } from '../player/GlobalPlayer'

export default {
    data() {
        return {
            videoPlayer
        }
    },
    components: {
        Navbar,
        VBtn,
        VIcon,
        VContent,
        VSlideYTransition,
        Floating,
        VideoPlayer
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
    position: fixed !important;
    z-index: 1000;
  }
</style>
