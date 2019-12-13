<template>
  <div class="row">
    <div class="col-12">
      <h1>INDEX</h1>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    page () {
      return this.$state.page
    }
  },

  async fetch ({ store, app, params, error }) {
    const { page, modules } = await app.$axios.$get('page/main')
    store.commit('setPage', page)
    store.commit('setModules', modules)
  }
}
</script>

<style></style>
