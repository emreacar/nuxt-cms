<template>
  <div />
</template>

<script>
export default {
  scrollToTop: true,
  async asyncData ({ store, app, params, error }) {
    const { page, content, modules } = await app.$axios.$get('page/main')
    store.commit('setPage', page)
    store.commit('setModules', modules)
    store.commit('setCrumb', [])

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
