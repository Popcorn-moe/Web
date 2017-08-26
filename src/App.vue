<template>
  <v-app :light="!darkTheme" :dark="darkTheme">
    <layout></layout>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Layout from './components/layout/Layout'
  
  export default {
    components: {
      Layout
    },
    computed: mapGetters({
      darkTheme: 'darkTheme',
    })
  }
</script>
