<template>
    <div>
      <pre>
        {{ news }}
      </pre>
    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: ['id'],
  data() {
    return {
      news: {}
    }
  },
  components: {},
  apollo: {
    news: {
      query: gql`query ($id: ID!) {
        _news(id: $id) {
          name, content, author { login }
        }
      }`,
      variables() {
          return {
            id: this.id
          }
      },
      update: ({ _news }) => _news
    }
  }
}
</script>

<style lang="stylus">
</style>
