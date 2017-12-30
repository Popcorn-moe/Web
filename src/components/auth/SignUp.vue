<template>
  <div class="elevation-2">
    <v-layout row wrap>
      <v-flex sm4 xs12 class="left-panel">
        <div class="top-logo text-xs-center">
          <object data="/static/logo-animated.svg" type="image/svg+xml" class="itop-logo"></object>
        </div>
        <h1 class="buttons-title" v-t="'sign_up.sign_up_with'"></h1>
        <div class="social-buttons">
          <v-btn class="social-button google-color" large light block @click.stop="signup('google')">
            <img src="/static/icons/google-icon.svg">
            Google
          </v-btn>
          <v-btn class="social-button discord-color" large light block @click.stop="signup('discord')">
            <img src="/static/icons/discord-icon.svg">
            Discord
          </v-btn>
          <v-btn class="social-button twitter-color" large light block @click.stop="signup('twitter')">
            <img src="/static/icons/twitter-icon.svg">
            Twitter
          </v-btn>
          <v-btn class="social-button kitsu-color" large light block @click.stop="signup('kitsu')">
            <img src="/static/icons/kitsu-icon.svg">
            Kitsu
          </v-btn>
        </div>
      </v-flex>
      <v-flex class="fields-container" sm8 xs12>
        <div class="inputs">
          <v-text-field v-model="login" :label="$t('sign_up.login')" light></v-text-field>
          <v-text-field v-model="email" :label="$t('sign_up.mail')" light></v-text-field>
          <v-text-field :label="$t('sign_up.password')" light
                        v-model="password"
                        :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (hidePassword = !hidePassword)"
                        :type="hidePassword ? 'password' : 'text'"></v-text-field>
          <v-text-field :label="$t('sign_up.password')" light
                        v-model="passwordConfirm"
                        :append-icon="hidePasswordConfirm ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (hidePasswordConfirm = !hidePasswordConfirm)"
                        :type="hidePasswordConfirm ? 'password' : 'text'"></v-text-field>
          <v-checkbox :label="$t('sign_up.newsletter')" v-model="newsletter" light></v-checkbox>
          <div class="text-xs-center">
            <v-btn class="login-button secondary-color black--text" large light @click.stop="signup()" v-t="'sign_up.sign_up'"></v-btn>
          </div>
        </div>
        <div class="link-container">
          <router-link replace :to="{ name: 'Login' }" light v-t="'sign_up.sign_in'"></router-link>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { VBtn, VTextField, VCheckbox } from 'vuetify/es5/components'
  import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
  import { signup } from '../../utils/auth'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        login              : '',
        email              : '',
        password           : '',
        passwordConfirm    : '',
        newsletter         : true,
        hidePassword       : true,
        hidePasswordConfirm: true
      }
    },
    components: {
      VBtn,
      VTextField,
      VCheckbox,
      VContainer,
      VFlex,
      VLayout
    },
    methods   : {
      ...mapActions({
                      setIsAuth: 'setIsAuth'
                    }),
      signup(provider) {
        if (provider)
        {
          const callback = encodeURIComponent(`${location.origin}/#${this.$router.last}`)
          window.location.assign(`${process.env.AUTH_URL}/login/${provider}?callback=${callback}`)
        }
        else
        {
          signup(this.login, this.email, this.password, this.newsletter).then(() => {
            this.$router.go(-1)
            this.setIsAuth(true)
          })
        }
      }
    },
    i18n: {
      messages: {
        fr: {
          sign_up: {
            sign_up_with: 'S\'inscrire avec :',
            sign_up: 'S\'inscrire',
            login: 'Pseudo',
            mail: 'E-mail',
            password: 'Mot de passe',
            newsletter: 'Recevoir les newsletter',
            sign_in: 'Se connecter'
          }
        },
        en: {
          sign_up: {
            sign_up_with: 'Sign up with :',
            sign_up: 'Sign up',
            login: 'Login',
            mail: 'E-mail',
            password: 'Password',
            newsletter: 'Get newsletter',
            sign_in: 'Sign in'
          }
        },
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .left-panel {
    background-color: white;

    @media (max-width: 600px) {
      background-color: rgba(255, 255, 255, 0.71);
    }

    .top-logo {
      @media (min-width: 600px) {
        display: none;
      }

      .itop-logo {
        width: 200px;
      }
    }

    .buttons-title {
      padding-top: 30px;
      text-align: center;
      color: #212121 !important;
      font-size: 20px;
    }
    .social-buttons {
      padding: 8px;

      @media (max-width: 600px) {
        padding: 10%;
      }

      .social-button {
        .btn__content img {
          position: absolute;
          left: 10px;
          height: 35px;
        }
        box-shadow: none;
        border-radius: 10px;
        margin-top: 20px;
      }
    }
  }

  .fields-container {
    background-color: rgba(255, 255, 255, 0.71);

    .inputs {
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 50px;
      padding-right: 50px;
    }

    .link-container {
      width: 100%;
      padding: 15px;

      a {
        text-decoration: none;
        color: #4b4b4b !important;
      }
    }

    .login-button {
      box-shadow: none;
      margin: 0 !important;
    }
  }
</style>
