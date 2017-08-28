<template>
    <div>
        <v-btn fab @click.stop="$router.go(-1)" class="button-float main-color" small>
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <main>
            <div class="auth-root">
                <router-view class="auth-center"></router-view>
            </div>
        </main>
    </div>
</template>

<script>
import { VBtn, VIcon } from '@/vuetify'

export default {
  components: {
    VBtn,
    VIcon
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/main'

  .button-float {
    position: fixed !important;
    z-index: 1000;
  }
  .auth-root {
      width: 100vw;
      height: 100vh;
      background: url(https://cdn.discordapp.com/attachments/349931957078982658/351334821907398666/slider.jpg) no-repeat;
      background-size: cover;
  }
  .auth-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
