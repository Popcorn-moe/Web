<template>
    <v-footer class="footer pt-3" absolute inset app height="auto" ref="footer">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex sm6 lg4>
                    <h3>A propos</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </v-flex>
                <v-flex sm6 lg8>
                    <div class="text-xs-center follow">
                        <h1>Follow us</h1>
                        <a 
                            class="primary social elevation-3"
                            href="https://twitter.com/popcorn_moe"
                            target="_blank"
                        >
                             <img src="/static/icons/twitter-icon.svg" height="35px">
                        </a>
                        <a 
                            class="primary social elevation-3"
                            href="https://discord.gg/FEvvcWW"
                            target="_blank"
                        >
                             <img src="/static/icons/discord-icon.svg" height="35px">
                        </a>
                        <a 
                            class="primary social elevation-3"
                            href="https://github.com/Popcorn-moe"
                            target="_blank"
                        >
                             <img src="/static/icons/github-icon.svg" height="35px">
                        </a>
                    </div>
                </v-flex>
            </v-layout>
            <div class="text-xs-center links">
                <ul>
                    <li>Mentions légales</li>
                    <li>CGU</li>
                    <li>A propos</li>
                </ul>
            </div>
        </v-container>
    </v-footer>
</template>

<script>
import { VFooter } from "vuetify";
import { VContainer, VFlex, VLayout } from "vuetify/es5/components/VGrid";
import { mapGetters } from "vuex";

export default {
	name: "Footer",
	components: {
		VContainer,
		VFlex,
		VLayout,
		VFooter
	},
	computed: mapGetters({
		drawer: "drawer"
	}),
	created() {
		window.addEventListener("resize", this.onResize);
	},
	destroyed() {
		window.removeEventListener("resize", this.onResize);
	},
	watch: {
		drawer() {
			const time = Date.now();
			const update = () => {
				requestAnimationFrame(() => {
					if (Date.now() >= time + 200) return;
					this.$refs.footer.callUpdate();
					update();
				});
			};
			update();
		}
	},
	methods: {
		onResize() {
			this.$refs.footer.callUpdate();
		}
	}
};
</script>

<style lang="stylus">

    .footer {


        p {
            margin-top 15px
            text-align justify
        }

        .links {
            margin 15px;
            margin-bottom 10px
            
            li {
                padding 12px;
                display inline
            }
        }

        .follow 
        {
            position relative
            top 50%
            transform: translateY(-50%);
            .social {
                margin: 20px
                display inline-block
                width 55px;
                height: 55px;
                padding-top: 10px;
                border-radius: 100%
                
                &:hover {
                    opacity: 0.9;
                }
            }

           
        }

        
    }

</style>
