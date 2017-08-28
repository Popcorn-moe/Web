<template>
    <div class="elevation-2">
        <v-layout row wrap>
            <v-flex xs4 class="white">
                <h1 class="buttons-title">Se connecter avec :</h1>
                <v-btn class="social-button google-color" large light >
                  <object data="/static/icons/google-icon.svg" type="image/svg+xml" style="width: 40px; padding-right: 10px;"></object>
                  Google
                </v-btn>
                <v-btn class="social-button discord-color" large light>
                  <object data="/static/icons/discord-icon.svg" type="image/svg+xml" style="width: 40px; padding-right: 10px"></object>
                  Discord
                </v-btn>
                <v-btn class="social-button twitter-color" large light>
                  <object data="/static/icons/twitter-icon.svg" type="image/svg+xml" style="width: 40px; padding-right: 10px"></object>
                  Twitter
                </v-btn>
                <v-btn class="social-button kitsu-color" large light>
                  <object data="/static/icons/kitsu-icon.svg" type="image/svg+xml" style="width: 40px; padding-right: 10px"></object>
                  Kitsu
                </v-btn>
            </v-flex>
            <v-flex class="fields-container" xs8>
              <div class="text-xs-center">
                  <object data="/static/logo-animated.svg" type="image/svg+xml" class="auth-logo"></object>
              </div>
              <v-text-field name="input-1" label="E-mail / Pseudo" id="field-login" light></v-text-field>
              <v-text-field name="input-2" label="Mot de passe" id="testing" light></v-text-field>
              <div class="text-xs-right">
                <v-btn class="login-button secondary-color black--text" large light>Se Connecter</v-btn>
              </div>
              <div class="sign-in-container">
                <router-link to="SignUp" light>Se créer un compte</router-link>
              </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import { VBtn, VTextField } from '@/vuetify'
  import Grid from 'vuetify/src/components/grid'
  export default {
    components: {
      VBtn,
      VTextField,
      ...Grid
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl';



  .buttons-title
  {
    padding-top: 30px;
    text-align: center;
    color: #212121 !important;
    font-size: 20px;
    font-weight: bold;
  }

  .social-button {

    width: calc(100% - 16px);
  }

  .fields-container
  {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 50px !important;
    padding-right: 50px !important;
    background-color: rgba(255, 255, 255, 0.71);
  }

  .login-button
  {
    margin: 0 !important;
  }

  .sign-in-container
  {
    width: 100%;
  }

  .auth-logo {
    width: 110px;
  }
</style>
