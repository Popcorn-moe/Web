<template>
    <div class="elevation-2">
        <v-layout row wrap>
            <v-flex xs4 class="white">
                <h1 style="font-size: 20px;">Se connecter Avec</h1>
                <v-btn class="social-button" large light>Google</v-btn>
                <v-btn class="social-button" large light>Discord</v-btn>
                <v-btn class="social-button" large light>Twitter</v-btn>
                <v-btn class="social-button" large light>Facebook</v-btn>
            </v-flex>
            <v-flex xs8>
                <div class="text-xs-center">
                    <object data="/static/logo-animated.svg" type="image/svg+xml" class="auth-logo"></object>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<style lang="stylus">
  @import '../../stylus/main'

  .social-button {
      width: calc(100% - 16px);
  }

  .auth-logo {
      width: 110px;
  }
</style>
