<template>
  <div v-if="modules.length" class="container">
    <div class="row">
      <div class="col-12">
        {{ modules }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    modules () {
      const moduleIds = this.$store.state.positions.CONTENT_TOP || []

      return this.$store.state.modules.filter(module => moduleIds.includes(module._id))
    }
  }
}
</script>
