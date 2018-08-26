<template>
    <v-card class="user">
        <v-card-media :src="user.background || 'https://images6.alphacoders.com/505/thumb-1920-505441.jpg'" height="120px"></v-card-media>
        <v-card-title primary-title>
            <img class="avatar" :src="user.avatar" height="100px" width="100px">
            <router-link :to="{ name: 'User', params: { userLogin: user.login, page: 'profile' }}">
                <h3 class="headline">{{ user.login }}</h3>
            </router-link>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </div>
        </v-card-title>
    </v-card>
</template>

<script>
import { VBtn } from "vuetify";
import {
	VCard,
	VCardTitle,
	VCardMedia,
	VCardText,
	VCardActions
} from "vuetify/es5/components/VCard";

export default {
	name: "user",
	props: ["user"],
	components: {
		VBtn,
		VCard,
		VCardMedia,
		VCardTitle,
		VCardText,
		VCardActions
	}
};
</script>


<style lang="stylus">
    @import '../../stylus/main.styl';

    .user {
        .avatar {
            display inline-block
            width 100px !important;
            height 100px;
            top -50px !important;
        }

        a {
            text-decoration none
            color: $main-color
        }

        .card__title {
            padding-top 0;
        }

        .headline {
            font-size: 23px !important
            position relative
            top: -20px;
            left: 10px;
        }
    }
</style>
