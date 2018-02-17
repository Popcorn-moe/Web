<template>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <div class="vertical-align">
          <v-card>
            <img v-if="gif.type === 'img'" :src="gif.src">
            <iframe v-else-if="gif.type === 'video'" :src="gif.src" frameborder="0"></iframe>

            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <h1 class="err">404</h1>
                  <h2 class="main-message" v-t="'not_found.main_message'"></h2>
                  <h3 class="sub-message" v-t="'not_found.sub_message'"></h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { VBtn, VIcon } from "vuetify/es5/components";
import { VCard, VCardTitle, VCardMedia } from "vuetify/es5/components/VCard";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";

const GIFS = [
	{ src: "https://i.imgur.com/1A17LFL.gif", type: "img" },
	{
		src:
			"https://cdn.discordapp.com/attachments/349974957998080001/355086450699534336/unknown.png",
		type: "img"
	},
	{
		src:
			"https://images-ext-1.discordapp.net/external/dlIPdqpVNkz6YgwgmicyLPCE-IMHeg65sOa5P2RhgYI/https/rra.ram.moe/i/r12y82Xex.gif",
		type: "img"
	},
	{ src: "https://www.youtube.com/embed/_NXrTujMP50", type: "video" }
];

export default {
	name: "NopPage",
	data() {
		return {
			gif: GIFS[Math.floor(Math.random() * GIFS.length)]
		};
	},
	components: {
		VContainer,
		VFlex,
		VLayout,
		VCard,
		VCardTitle,
		VCardMedia,
		VBtn,
		VIcon
	},
	i18n: {
		messages: {
			fr: {
				not_found: {
					main_message: "La page que vous cherchez n'existe pas.",
					sub_message: "Encore un tour des pinguins unijambistes de l'espace..."
				}
			},
			en: {
				not_found: {
					main_message: "The page you are searching for can't be found.",
					sub_message: "That's your fault. Baka."
				}
			}
		}
	}
};
</script>

<style lang="stylus">
  @import "../stylus/main.styl";

  .vertical-align {
    transform: translateY(calc(50vh - 50%));
    height: 100%;
    img {
      width: 100%;
      height: auto;
    }

    iframe {
      width: 100%;
      height: 400px;
    }

    .err {
      font-size: 24px;
    }

    .main-message {
      font-size: 20px;
    }

    .sub-message {
      font-size: 14px;
    }
  }
</style>
