<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-bind:is="importModule" :data="data.content || []" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    importModule () {
      const loadPath = this.data.page.type !== 'module'
        ? 'list/' + this.data.page.type
        : 'modules/' + this.data.content.module

      return () => import('@@/components/' + loadPath)
    }
  }
}
</script>
