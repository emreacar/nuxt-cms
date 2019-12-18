<template>
  <div>
    {{ data }}
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
