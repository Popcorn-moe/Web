<template>
  <div class="page-container">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex offset-sm3 sm6 xs12>
          <v-text-field v-model="search" :label="$t('search.search')" hide-details single-line append-icon="search"></v-text-field>
          <div class="text-xs-center">
            <transition-group name="fade-transition">
              <v-chip v-for="tag in tags" :key="tag.id" class="white--text" :style="{ 'background-color': tag.color }" v-if="tag.value" @input="tag.value = false" close>
                {{ tag.name }}
              </v-chip>
            </transition-group>
          </div>
          <div class="text-xs-center">
            <a class="search-options-button" @click.stop="showMore = !showMore" v-t="showMore ? 'search.less_options' : 'search.more_options'"></a>
          </div>
        </v-flex>
      </v-layout>
			<div :class="{ 'search-options-body': true, 'search-options-body-hidden': !showMore }">
				<v-layout row wrap>
					<v-flex offset-sm1 xs12 sm2>
						<v-btn color="primary" dark @click.native.stop="dialog_tags = true" small block top v-t="'search.add_tags'"></v-btn>
						<v-dialog v-model="dialog_tags" max-width="50%">
							<v-card>
								<v-card-title class="headline" v-t="'search.add_tags'"></v-card-title>
								<div class="v-card__text">
									<v-chip v-for="tag in tags" :key="tag.id"
										:class="{ 'white--text': tag.value }"
										:style="{ 'background-color': tag.value ? tag.color : null }"
										@click.stop="tag.value = !tag.value">{{ tag.name }}
									</v-chip>
								</div>
								<div class="v-card__actions">
									<v-spacer></v-spacer>
									<v-btn color="primary" class="darken-1" flat="flat" @click.native="dialog_tags = false" v-t="'search.finish'"></v-btn>
								</div>
							</v-card>
						</v-dialog>
					</v-flex>
					<v-flex xs12 sm2>
						<v-select :label="$t('search.sort_by')" bottom></v-select>
					</v-flex>
					<v-flex xs12 sm2>
						<v-select :label="$t('search.status')" v-model="status" :items="animesStatus" clearable bottom></v-select>
					</v-flex>
					<v-flex xs12 sm2>
						<v-select :label="$t('search.type')" v-model="type" :items="animesTypes" clearable bottom></v-select>
					</v-flex>
					<v-flex xs12 sm2>
						<v-autocomplete :label="$t('search.author')"
								autocomplete
								multiple
								:no-data-text="$t('search.nothing_found')"
								:search-input.sync="searchAuthor"
								:items="authorsResults"
								item-text="name"
								item-value="id"
								v-model="selectedAuthors"
								return-object
								bottom
						></v-autocomplete>
					</v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex offset-sm4 sm4 xs12>
						<v-text-field :label="$t('search.year')" single-line></v-text-field>
					</v-flex>
				</v-layout>
			</div>
    </v-container>
		<v-layout row wrap>
			<v-flex v-for="result in searchResults" :key="result.id" class="text-xs-center">
				<cover :value="result"></cover>
			</v-flex>
			<v-flex v-for="i in 24" :key="i"><div class="filler"></div></v-flex>
		</v-layout>
  </div>
</template>

<script>
import {
	VTextField,
	VSelect,
	VAutocomplete,
	VBtn,
	VDialog,
	VChip
} from "vuetify";
import { VCard, VCardTitle } from "vuetify/es5/components/VCard";
import {
	VContainer,
	VFlex,
	VLayout,
	VSpacer
} from "vuetify/es5/components/VGrid";
import Cover from "../components/cover/Cover.vue";
import gql from "graphql-tag";

export default {
	name: "search",
	data() {
		return {
			showMore: false,
			dialog_tags: false,
			tags: [],
			animesStatus: [],
			animesTypes: ["ANIME", "FILM"],

			searchAuthorResults: [],
			selectedAuthors: [],
			searchAuthor: "",

			searchResults: [],
			search: "",
			status: null,
			type: null
		};
	},
	computed: {
		authorsResults() {
			const selectedAuthorsId = this.selectedAuthors.map(({ id }) => id);
			const search = this.searchAuthorResults.filter(
				({ id }) => !selectedAuthorsId.includes(id)
			);
			return search.concat(this.selectedAuthors);
		}
	},
	apollo: {
		tags: {
			query: gql`
				{
					tags {
						id
						name
						desc
						color
					}
				}
			`,
			update: ({ tags }) =>
				tags.map(tag => Object.assign({}, tag, { value: false }))
		},
		animesStatus: {
			query: gql`
				{
					__type(name: "AnimeStatus") {
						enumValues {
							name
						}
					}
				}
			`,
			update: ({ __type: { enumValues } }) =>
				enumValues.map(e =>
					e.name
						.split("_")
						.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
						.join(" ")
				)
		},
		searchResults: {
			query: gql`
				query searchAnimes(
					$name: String
					$status: AnimeStatus
					$type: MediaType
					$authors: [ID!]
					$year: Int
					$tags: [ID!]
				) {
					searchAnimes(
						name: $name
						status: $status
						type: $type
						authors: $authors
						year: $year
						tags: $tags
					) {
						id
						names
						authors {
							name
						}
						cover {
							normal
						}
					}
				}
			`,
			variables() {
				return {
					name: this.search,
					status: this.status && this.status.toUpperCase().replace(/ /g, "_")
				};
			},
			update: ({ searchAnimes }) =>
				searchAnimes.map(
					({ id, names: [name], authors: [author], ...fields }) => ({
						author,
						name,
						to: { name: "Anime", params: { id } },
						...fields
					})
				)
		},
		searchAuthorResults: {
			query: gql`
				query($name: String!) {
					searchAuthor(name: $name) {
						id
						name
					}
				}
			`,
			variables() {
				return {
					name: this.searchAuthor || ""
				};
			},
			update: ({ searchAuthor }) => searchAuthor
		}
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VSpacer,
		VTextField,
		VSelect,
		VAutocomplete,
		VDialog,
		VCard,
		VCardTitle,
		VBtn,
		Cover,
		VChip
	},
	i18n: {
		messages: {
			fr: {
				search: {
					more_options: "Plus d'options",
					less_options: "Moins d'options",
					nothing_found: "Aucun resultats",
					add_tags: "Ajouter des tags",
					finish: "Terminer",
					search: "Rechercher",
					sort_by: "Trier par",
					status: "Status",
					type: "Type",
					author: "Autheur",
					year: "Année"
				}
			},
			en: {
				search: {
					more_options: "More options",
					less_options: "Less options",
					nothing_found: "Nothing found",
					add_tags: "Add tags",
					finish: "Done",
					search: "Search",
					sort_by: "Sort by",
					status: "Status",
					type: "Type",
					author: "Author",
					year: "Year"
				}
			}
		}
	}
};
</script>

<style lang="stylus">
@import '../stylus/main';

.page-container {
	padding-top: 30px;

	.chip:focus {
		box-shadow: none;
	}
}

.search-options-button {
	cursor: pointer;
	padding: 5px;
}

.search-options-body {
	max-height: 170px;
	transition: max-height 0.3s;

	&-hidden {
		max-height: 0;
		overflow: hidden;
	}
}

.filler {
	width: $anime.width + $anime.padding * 2;
	margin: 2px;
}

@media (max-width: 600px) {
	.search-options-body {
		max-height 450px;

		&-hidden {
			max-height: 0;
			overflow: hidden;
		}
	}
}
// 450px;
</style>
