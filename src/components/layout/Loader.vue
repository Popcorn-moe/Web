
<template>
  <object data="/static/loader.svg" type="image/svg+xml" class="loader"></object>
</template>

<script>
  export default {
    name: "Loader",
    data() {
      return {}
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";
  .loader {
    display: block
    height: 100vh;
    width: 10%;
    margin auto auto;
  }
</style>
