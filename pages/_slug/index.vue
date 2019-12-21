<template>
  <pageLoader v-if="page" :data="{pageType: page.type, content}" />
</template>

<script>
import pageLoader from '@@/components/pageLoader'

export default {
  components: {
    pageLoader
  },
  async asyncData ({ store, app, params, error }) {
    const { page } = await app.$axios.$get('page/link',
      { params: { slug: params.slug } })
    if (page) {
      store.commit('setPage', page.page)
      store.commit('setModules', page.modules)
    }

    return {
      page: page ? page.page : false,
      content: page ? page.content : false
    }
  },

  head () {
    const headData = this.page
      ? {
        title: this.page.title[this.appData.settings.defaultLang],
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.page.meta[this.appData.settings.defaultLang]
          }
        ]
      }
      : {}
    return headData
  }
}
</script>

<style></style>
