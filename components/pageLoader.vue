<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-if="importModule" v-bind:is="importModule" :data="data.content[data.pageType]" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return { pageType: false, content: {} } }
    }
  },
  computed: {
    importModule () {
      const loadData = this.data.content[this.data.pageType]
      const loadPath = this.data.pageType !== 'module'
        ? 'list/' + this.data.pageType
        : 'modules/' + loadData.module
      if (!this.data.pageType || !this.data.content[this.data.pageType]) {
        return false
      }
      return () => import('@@/components/' + loadPath)
    }
  }
}
</script>
