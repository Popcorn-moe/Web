<template>
  <div class="elevation-2">
    <v-layout row wrap>
      <v-flex xs4 class="white">
        <h1 class="buttons-title">S'inscrire avec :</h1>
        <v-btn class="social-button google-color" large light @click.stop="() => login('google')">
          <img src="/static/icons/google-icon.svg">
          Google
        </v-btn>
        <v-btn class="social-button discord-color" large light @click.stop="() => login('discord')">
          <img src="/static/icons/discord-icon.svg">
          Discord
        </v-btn>
        <v-btn class="social-button twitter-color" large light @click.stop="() => login('twitter')">
          <img src="/static/icons/twitter-icon.svg">
          Twitter
        </v-btn>
        <v-btn class="social-button kitsu-color" large light @click.stop="() => login('kitsu')">
          <img src="/static/icons/kitsu-icon.svg">
          Kitsu
        </v-btn>
      </v-flex>
      <v-flex class="fields-container" xs8>
        <div class="inputs">
          <v-text-field name="input-1" label="Pseudo" id="field-login" light></v-text-field>
          <v-text-field name="input-2" label="E-mail" id="testing" light></v-text-field>
          <v-text-field name="input-2" label="Mot de passe" id="testing" light></v-text-field>
          <v-text-field name="input-2" label="Mot de passe" id="testing" light></v-text-field>
          <v-checkbox label="Recevoir les newsletter" light></v-checkbox>
          <div class="text-xs-center">
            <v-btn class="login-button secondary-color black--text" large light>S'inscrire</v-btn>
          </div>
        </div>
        <div class="link-container">
          <router-link to="Login" light>Se connecter</router-link>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { VBtn, VTextField, VCheckbox } from '@/vuetify'
  import Grid from 'vuetify/src/components/grid'
  export default {
    components: {
      VBtn,
      VTextField,
      VCheckbox,
      ...Grid
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
    font-weight: bold;
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
