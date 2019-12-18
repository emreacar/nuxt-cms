<template>
  <div>
    {{ data.page }}
  </div>
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
