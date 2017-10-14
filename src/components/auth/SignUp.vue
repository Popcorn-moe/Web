<template>
  <div class="elevation-2">
    <v-layout row wrap>
      <v-flex xs4 class="white">
        <h1 class="buttons-title">S'inscrire avec :</h1>
        <v-btn class="social-button google-color" large light @click.stop="signup('google')">
          <img src="/static/icons/google-icon.svg">
          Google
        </v-btn>
        <v-btn class="social-button discord-color" large light @click.stop="signup('discord')">
          <img src="/static/icons/discord-icon.svg">
          Discord
        </v-btn>
        <v-btn class="social-button twitter-color" large light @click.stop="signup('twitter')">
          <img src="/static/icons/twitter-icon.svg">
          Twitter
        </v-btn>
        <v-btn class="social-button kitsu-color" large light @click.stop="signup('kitsu')">
          <img src="/static/icons/kitsu-icon.svg">
          Kitsu
        </v-btn>
      </v-flex>
      <v-flex class="fields-container" xs8>
        <div class="inputs">
          <v-text-field v-model="login" label="Pseudo" light></v-text-field>
          <v-text-field v-model="email" label="E-mail" light></v-text-field>
          <v-text-field label="Mot de passe" light
                  v-model="password"
                  :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (hidePassword = !hidePassword)"
                  :type="hidePassword ? 'password' : 'text'"></v-text-field>
          <v-text-field label="Mot de passe" light
                   v-model="passwordConfirm"
                  :append-icon="hidePasswordConfirm ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (hidePasswordConfirm = !hidePasswordConfirm)"
                  :type="hidePasswordConfirm ? 'password' : 'text'"></v-text-field>
          <v-checkbox label="Recevoir les newsletter" v-model="newsletter" light></v-checkbox>
          <div class="text-xs-center">
            <v-btn class="login-button secondary-color black--text" large light @click.stop="signup()">S'inscrire</v-btn>
          </div>
        </div>
        <div class="link-container">
          <router-link replace :to="{ name: 'Login' }" light>Se connecter</router-link>
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
        login: '',
        email: '',
        password: '',
        passwordConfirm: '',
        newsletter: true,
        hidePassword: true,
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
    methods: {
      ...mapActions({
        setIsAuth: 'setIsAuth'
      }),
      signup(provider) {
        if (provider) {
            const callback = encodeURIComponent(`${location.origin}/#${this.$router.last}`)
            window.location.assign(`${process.env.AUTH_URL}/login/${provider}?callback=${callback}`)
        } else {
          signup(this.login, this.email, this.password, this.newsletter).then(() => {
            this.$router.go(-1)
            this.setIsAuth(true)
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';

  .buttons-title {
    padding-top: 30px;
    text-align: center;
    color: #212121 !important;
    font-size: 20px;
  }

  .social-button {
    .btn__content img {
      position: absolute;
      left: 10px;
      height: 35px;
    }
    width: calc(100% - 16px);
  }

  .fields-container {

    background-color: rgba(255, 255, 255, 0.71);
    .inputs{
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 50px !important;
      padding-right: 50px !important;
    }

    .link-container {
      width: 100%;
      padding: 15px;

      a {
        text-decoration: none;
        color: #4b4b4b  !important;
      }
    }
  }

  .login-button {
    margin: 0 !important;
  }
</style>
