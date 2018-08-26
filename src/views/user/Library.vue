<template>
	<v-container fluid grid-list-md>
		<v-layout row>
			<v-flex xs12>
			<v-btn
				v-if="$vuetify.breakpoint.xs && $route.name !== 'UserLibrary'"
				fab
				small
				color="primary"
				class="ma-2"
				style="z-index: 3"
				:to="{ name: 'UserLibrary' }"
			>
				<v-icon>arrow_back</v-icon>
			</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row wrap v-if="!$vuetify.breakpoint.smAndUp && $route.name == 'UserLibrary'">
			<v-flex xs12>
				<v-text-field
					placeholder="Search"
					solo
					append-icon="search"
					v-model="search"
				></v-text-field>
			</v-flex>
		</v-layout>
		<v-layout row wrap fill-height>
			<v-flex sm9 xs12 v-if="$vuetify.breakpoint.smAndUp || $route.name !== 'UserLibrary'">
				<v-layout row wrap>
					<v-flex xs12>
						<v-text-field
							placeholder="Search"
							solo
							append-icon="search"
							v-model="search"
						></v-text-field>
					</v-flex>
				</v-layout>
				<router-view></router-view>
			</v-flex>
			<v-flex sm3 xs12 v-if="$vuetify.breakpoint.smAndUp || $route.name === 'UserLibrary'">
				<v-list dense subheader class="settings-nav elevation-2">
					<v-subheader class="grey--text darken-3">Animes Status</v-subheader>
					<div v-for="(s, key) in statusButtons"
						:key="key">
						<v-list-tile

							:to="{ name: 'LibraryAnimeStatus', params: { page: 'library', metas: user.metas, status: key.toLowerCase().replace(/_/g, '-') } }"
							:active-class="s.color + ' white--text'"
							@click="clearSearch()"
						>
							<v-list-tile-avatar>
								<v-icon v-html="s.icon" v-bind:class="[ `${iconColor(key)}--text` ]"></v-icon>
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title v-t="s.i18n"></v-list-tile-title>
							</v-list-tile-content>
							<v-list-tile-action>
								{{ animesCount(key) }}
							</v-list-tile-action>
						</v-list-tile>
					</div>
					
					<v-divider></v-divider>
					<v-subheader class="grey--text darken-3">Others</v-subheader>
					<v-list-tile
						active-class="primary white--text"
					>
						<v-list-tile-content>
							<v-list-tile-title>Follows</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-flex>
			
		</v-layout>
	</v-container>
</template>


<script>
import {
	VIcon,
	VBtn,
	VSubheader,
	VTextField,
	VDialog,
	VDivider
} from "vuetify";
import {
	VList,
	VListGroup,
	VListTile,
	VListTileAction,
	VListTileAvatar,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import {
	VCard,
	VCardTitle,
	VCardActions,
	VCardText
} from "vuetify/es5/components/VCard";
import {
	VContainer,
	VFlex,
	VLayout,
	VSpacer
} from "vuetify/es5/components/VGrid";

import gql from "graphql-tag";

const statusButtons = {
	WANT_TO_WATCH: {
		icon: "watch_later",
		color: "blue",
		i18n: "route.user_library.want_to_watch"
	},
	WATCHING: {
		icon: "play_arrow",
		color: "purple",
		i18n: "route.user_library.watching",
		to: { status: "waching" }
	},
	COMPLETED: {
		icon: "check",
		color: "green",
		i18n: "route.user_library.completed"
	},
	ON_HOLD: {
		icon: "pause",
		color: "orange",
		i18n: "route.user_library.on_hold"
	},
	DROPPED: {
		icon: "delete",
		color: "red",
		i18n: "route.user_library.dropped"
	}
};

export default {
	name: "user-library",
	props: ["user"],
	data() {
		return {
			statusButtons,
			search: "",
			forcedClear: false
		};
	},
	methods: {
		iconColor(key) {
			return (
				(this.$route.params.status &&
					this.$route.params.status == key.toLowerCase().replace(/_/g, "-") &&
					"white--color") ||
				this.statusButtons[key].color
			);
		},
		animesCount(key) {
			return (
				(this.user.metas &&
					this.user.metas.filter(({ status: s }) => s == key).length) ||
				0
			);
		},
		toId(name) {
			return name
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/ /g, "-")
				.toLowerCase();
		},
		clearSearch() {
			this.forcedClear = true;
			this.search = "";
		}
	},
	watch: {
		search(value) {
			if (value !== "") {
				const search = encodeURIComponent(this.toId(value));
				this.$router.push({
					name: "LibrarySearch",
					params: { page: "library", search, metas: this.user.metas }
				});
			} else if (!this.forcedClear) {
				this.$router.push({
					name: "LibraryAnimeStatus",
					params: {
						page: "library",
						status: "want-to-watch",
						metas: this.user.metas
					}
				});
			}
			this.forcedClear = false;
		}
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VList,
		VDivider,
		VListGroup,
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VListTileAvatar,
		VSubheader,
		VIcon,
		VBtn,
		VTextField,
		VCard,
		VSpacer,
		VDialog,
		VCardTitle,
		VCardActions,
		VCardText
	}
};
</script>

<style lang="stylus">
	@import "../../stylus/main.styl";

</style>
