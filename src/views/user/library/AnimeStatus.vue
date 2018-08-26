<template>
    <div style="padding-top: 15px">
        <v-layout row wrap>
			<div v-if="!animes || animes.length == 0">
				Ajoutez des animes a votre librairie
			</div>
			<v-flex v-if="animes && animes.length > 0" v-for="anime in animes" :key="anime.id" class="text-xs-center">
				<cover :value="anime"></cover>
			</v-flex>
			<v-flex v-for="i in 24" :key="i"><div class="filler"></div></v-flex>
		</v-layout>
    </div>
</template>


<script>
import gql from "graphql-tag";
import Cover from "../../../components/cover/Cover";
import { VFlex, VLayout } from "vuetify/es5/components/VGrid";

export default {
	name: "AnimeSatatus",
	props: {
		status: String,
		metas: Array
	},
	data() {
		return {};
	},
	computed: {
		animes() {
			return (
				this.metas &&
				this.metas
					.filter(
						({ status: s }) => s == this.status.toUpperCase().replace(/-/g, "_")
					)
					.map(
						({
							anime: {
								id,
								names: [name],
								authors: [author],
								...fields
							}
						}) => ({
							author,
							name,
							to: { name: "Anime", params: { id } },
							...fields
						})
					)
			);
		}
	},
	components: {
		Cover,
		VFlex,
		VLayout
	}
};
</script>


<style lang="stylus">
@import '../../../stylus/main';

.filler {
	width: $anime.width + $anime.padding * 2;
	margin: 2px;
}


</style>
