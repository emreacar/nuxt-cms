<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-bind:is="importModule" :data="data" :position="position" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    },
    position: {
      type: String,
      default: () => { return '' }
    }
  },
  computed: {
    importModule () {
      return () => import('@@/components/modules/' + this.data.module)
    }
  }
}
</script>
