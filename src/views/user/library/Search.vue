<template>
    <div style="padding-top: 15px">
        <v-layout row wrap>
			<div v-if="!animes || animes.length == 0">
				Aucuns resultat trouvé
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
	name: "LibrarySearch",
	props: ["metas", "search"],
	data() {
		return {};
	},
	methods: {
		toId(name) {
			return name
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/ /g, "-")
				.toLowerCase();
		}
	},
	computed: {
		animes() {
			return (
				(this.metas &&
					this.metas
						.filter(
							({ anime: { names } }) =>
								names.filter(
									name =>
										encodeURIComponent(this.toId(name)).indexOf(this.search) ==
										0
								).length > 0
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
						)) ||
				[]
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
    @import '../../../stylus/main.styl'
</style>
