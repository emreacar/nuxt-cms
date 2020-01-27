<template>
  <div />
</template>

<script>
export default {
  scrollToTop: true,
  async asyncData ({ store, app, params, error }) {
    const { page, pagePath } = await app.$axios.$get('page/link',
      { params: { slug: params.slug } })
    if (page && page.page) {
      store.commit('setPage', page.page)
      store.commit('setModules', page.modules)
      store.commit('setCrumb', pagePath)
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
