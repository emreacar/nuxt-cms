<template>
  <pageLoader :data="{pageType: page.type, content}" />
</template>

<script>
import pageLoader from '@@/components/pageLoader'

export default {
  components: {
    pageLoader
  },
  async asyncData ({ store, app, params, error }) {
    const { page, content, modules } = await app.$axios.$get('page/main')
    store.commit('setPage', page)
    store.commit('setModules', modules)

    return {
      page,
      content
    }
  },

  head () {
    return {
      title: this.page.title[this.appData.settings.defaultLang],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.meta[this.appData.settings.defaultLang]
        }
      ]
    }
  }
}
</script>

<style></style>
