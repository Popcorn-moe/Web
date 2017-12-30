<template>
  <div class="elevation-2">
    <v-layout row wrap>
      <v-flex sm4 xs12 class="left-panel">
        <div class="top-logo text-xs-center">
          <object data="/static/logo-animated.svg" type="image/svg+xml" class="itop-logo"></object>
        </div>
        <h1 class="buttons-title" v-t="'login.connect_with'"></h1>
        <div class="social-buttons">
          <v-btn class="social-button google-color" large light block @click.stop="login('google')">
            <img src="/static/icons/google-icon.svg">
            Google
          </v-btn>
          <v-btn class="social-button discord-color" large light block @click.stop="login('discord')">
            <img src="/static/icons/discord-icon.svg">
            Discord
          </v-btn>
          <v-btn class="social-button twitter-color" large light block @click.stop="login('twitter')">
            <img src="/static/icons/twitter-icon.svg">
            Twitter
          </v-btn>
          <v-btn class="social-button kitsu-color" large light block @click.stop="login('kitsu')">
            <img src="/static/icons/kitsu-icon.svg">
            Kitsu
          </v-btn>
        </div>
      </v-flex>
      <v-flex class="fields-container" sm8 xs12>
        <div class="middle-icon inputs">
          <div class="auth-logo text-xs-center">
            <object data="/static/logo-animated.svg" type="image/svg+xml" class="iauth-logo"></object>
          </div>
          <v-alert
            :info="alert && alert.info"
            :error="alert && alert.error"
            :success="alert && alert.success"
            :warning="alert && alert.warning"
            dismissible
            :value="alert !== null"
            @input="alert = null">
            {{ alert && alert.text }}
          </v-alert>
          <v-text-field :label="$t('login.login')" light
                        v-model="username"
          ></v-text-field>
          <v-text-field :label="$t('login.password')" light
                        v-model="password"
                        :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (hidePassword = !hidePassword)"
                        :type="hidePassword ? 'password' : 'text'"
          ></v-text-field>
          <div class="text-xs-right">
            <v-btn class="login-button secondary-color black--text" large light @click.stop="login()" v-t="'login.connect'"></v-btn>
          </div>
        </div>
        <div class="link-container">
          <router-link replace :to="{ name: 'SignUp' }" v-t="'login.sign_up'"></router-link>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { VBtn, VTextField, VIcon, VAlert } from 'vuetify/es5/components'
  import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
  import { login } from '../../utils/auth'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        username    : '',
        password    : '',
        hidePassword: true,
        alert       : null
      }
    },
    components: {
      VAlert,
      VBtn,
      VTextField,
      VContainer,
      VFlex,
      VLayout
    },
    methods: {
      ...mapActions({
                      setIsAuth: 'setIsAuth'
                    }),
      login(provider) {
        if (provider)
        {
          const callback = encodeURIComponent(`${location.origin}/#${this.$router.last}`)
          window.location.assign(`${process.env.AUTH_URL}/login/${provider}?callback=${callback}`)
        }
        else
        {
          login(this.username, this.password).then(() => {
            this.setIsAuth(true)
            this.$router.go(-1)
          }).catch(error => {
            if (error.alert)
              this.alert = error.alert
            else
              return Promise.reject(error)
          })
        }
      }
    },
    i18n: {
      messages: {
        fr: {
          login: {
            connect_with: 'Se connecter avec :',
            connect: ' Se connecter',
            sign_up: 'Créer un compte',
            login: 'E-mail / Pseudo',
            password: 'Mot de passe'
          }
        },
        en: {
          login: {
            connect_with: 'Connect With :',
            connect: 'Sign in',
            sign_up: 'Sign up',
            login: 'E-mail / Login',
            password: 'Password'
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

    .auth-logo {
      @media (max-width: 600px) {
        display: none;
      }

      .iauth-logo {
        width: 160px;
      }
    }

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
      padding-left 5px;
      padding-right 5px;
    }
  }
</style>
