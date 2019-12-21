<template>
  <div>
    {{ content }}
  </div>
</template>

<script>
export default {
  layout: 'content',
  async asyncData ({ store, app, params, error }) {
    let apiContent = { content: params.content || {} }

    if (!params.content) {
      apiContent = await app.$axios
        .$get('page/link', { params: { slug: params.slug } })
    }

    return {
      content: apiContent.content
    }
  },

  head () {
    return {}
  }
}
</script>

<style></style>
