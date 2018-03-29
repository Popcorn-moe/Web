<template>
    <div>
        <template v-if="$vuetify.breakpoint.smAndUp">
            <navbar :value="drawer" @input="toggleDrawer"></navbar>
            <v-btn v-if="!drawer" fab @click.stop="toggleDrawer(!drawer)" class="el-float main-color" small>
                <v-icon>menu</v-icon>
            </v-btn>
            <search class="el-float el-right"></search>
        </template>
        <mobile-navbar v-else></mobile-navbar>

        <main>
            <v-content class="mb-3">
                <loader v-show="isLoading"></loader>
                <div v-show="!isLoading">
                    <v-slide-y-transition mode="out-in">
                        <router-view></router-view>
                    </v-slide-y-transition>
                </div>
            </v-content>
            <LayoutFooter></LayoutFooter>
        </main>
    </div>
</template>

<script>
import Loader from "./Loader";

import { VBtn, VIcon } from "vuetify";
import { VContent, VContainer } from "vuetify/es5/components/VGrid";
import { VSlideYTransition } from "vuetify/es5/components/transitions";
import { mapGetters, mapActions } from "vuex";
import Navbar from "./navbar/Navbar";
import MobileNavbar from "./navbar/MobileNavbar";
import Search from "./Search";
import LayoutFooter from "./LayoutFooter";

export default {
	components: {
		Loader,
		Navbar,
		MobileNavbar,
		Search,
		VBtn,
		VIcon,
		VContent,
		VSlideYTransition,
		LayoutFooter
	},
	computed: mapGetters({
		drawer: "drawer",
		isLoading: "isLoading"
	}),
	methods: mapActions({
		toggleDrawer: "toggleDrawer"
	})
};
</script>

<style lang="stylus">
  @import '../../stylus/main'

  .el-float {
    position: fixed !important;
    z-index: 1000;
  }

  .el-right {
      right: 0;
  }
</style>
