<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-if="importModule" v-bind:is="importModule" :data="data.content[data.page.type]" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return { page: {}, content: {} } }
    }
  },
  computed: {
    importModule () {
      const loadData = this.data.content[this.data.page.type]
      const loadPath = this.data.page.type !== 'module'
        ? 'list/' + this.data.page.type
        : 'modules/' + loadData.module
      if (!this.data.content[this.data.page.type]) {
        return false
      }
      return () => import('@@/components/' + loadPath)
    }
  }
}
</script>
