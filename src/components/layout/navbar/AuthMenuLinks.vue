<template>
	<div>
		<v-list-tile :to="{ name: 'User', params: { page: 'profile' }}" @click="$emit('close')">
			<v-list-tile-action>
				<v-icon>face</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title v-t="'route.auth.profile'"></v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile :to="{ name: 'User', params: { page: 'library' }}" @click="$emit('close')">
			<v-list-tile-action>
				<v-icon>local_library</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title v-t="'route.auth.library'"></v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile :to="{ name: 'User', params: { page: 'friends' }}" @click="$emit('close')">
			<v-list-tile-action>
			<v-icon>group</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
			<v-list-tile-title v-t="'route.auth.friends'"></v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile :to="{ name: 'User', params: { page: 'settings' }}" @click="$emit('close')">
			<v-list-tile-action>
				<v-icon>settings</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title v-t="'route.auth.settings'"></v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<li class="text-xs-right user-logout" @click.stop="logout()" v-t="'route.auth.logout'"></li>
	</div>
</template>

<script>
import {
	VListTile,
	VListTileAction,
	VListTileContent,
	VListTileTitle
} from "vuetify/es5/components/VList";
import { mapActions } from "vuex";
import { VIcon } from "vuetify/es5/components";
import { logout } from "@/utils/auth";

export default {
	data() {
		return {
			me: {}
		};
	},
	components: {
		VListTile,
		VListTileAction,
		VListTileContent,
		VListTileTitle,
		VIcon
	},
	methods: {
		...mapActions({
			setIsAuth: "setIsAuth"
		}),
		logout() {
			this.$emit("close");
			logout().then(() => this.setIsAuth(false));
		}
	}
};
</script>

<style lang="stylus">
  @import '../../../stylus/main.styl';

  .user-logout {
    padding: 15px;
    color: #4b4b4b !important;
    text-decoration: none;
    cursor: pointer;3
  }
</style>
