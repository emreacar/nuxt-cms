<template>
  <div v-if="modules.length" class="row">
    <div class="col-12">
      {{ modules }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    modules () {
      const moduleIds = this.$store.state.positions.CONTENT_TOP_RIGHT || []

      return this.$store.state.modules.filter(module => moduleIds.includes(module._id))
    }
  }
}
</script>
