<template>
	<v-content class="auth-root" :style="{ 'background-image': `url(${this.moe})` }">
		<v-btn fab @click.stop="$router.go(-1)" class="button-float main-color" small>
			<v-icon>arrow_back</v-icon>
		</v-btn>
		<v-btn fab @click.stop="$apollo.queries.moe.refetch()" class="button-float button-right main-color" small>
			<v-icon>refresh</v-icon>
		</v-btn>
		<div class="button-float button-bottom">
			<language-select class="language" :transparent="false"></language-select>
		</div>

		<v-fade-transition mode="out-in">
			<router-view class="auth-center"></router-view>
		</v-fade-transition>
	</v-content>
</template>

<script>
import { VBtn, VIcon } from "vuetify";
import { VContent } from "vuetify/es5/components/VGrid";
import { VFadeTransition } from "vuetify/es5/components/transitions";
import LanguageSelect from "./navbar/LanguageSelect";
import gql from "graphql-tag";

export default {
	data() {
		return {
			moe: "/static/fallback_background.jpg"
		};
	},
	components: {
		VBtn,
		VIcon,
		VContent,
		VFadeTransition,
		LanguageSelect
	},
	apollo: {
		moe: {
			query: gql`
				{
					moe(moe: "background") {
						url
					}
				}
			`,
			update: ({ moe: { url } }) => url
		}
	}
};
</script>

<style lang="stylus">
	@import '../../stylus/main'

	.button-float {
		position: fixed !important;
		z-index: 2;
	}

	.button-bottom {
		bottom 5px;
		left: 5px;
		width 200px;
	}

	.button-right {
		right: 0;
	}

	.language {
		margin 8px;
	}

	.auth-root {
		height: 100%;
		min-height: 100vh;

		background-attachment: fixed;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		.auth-center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			min-width: 600px;

			@media (max-width: 600px) {
				position: inherit;
				transform: none;
				min-width: 0;
				width: 100%;
			}

		}
	}
</style>
