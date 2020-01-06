<template>
  <div v-html="data.settings.htmlContent" class="ql-editor" style="padding: 0 !important" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
