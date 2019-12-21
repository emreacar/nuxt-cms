<template>
  <div v-if="modules.length" class="row">
    <div
      v-for="m in modules"
      :key="m._id"
      class="col-12 mb-4"
    >
      <dynamic-loader :data="m" />
    </div>
  </div>
</template>

<script>
import dynamicLoader from '@@/components/dynamicLoader'

export default {
  components: {
    dynamicLoader
  },
  computed: {
    modules () {
      const moduleIds = this.$store.state.positions.CONTENT_BOTTOM_RIGHT || []
      const modules = this.$store.state.modules
        .filter(module => moduleIds.includes(module._id))
        .sort((a, b) => moduleIds.indexOf(a._id) - moduleIds.indexOf(b._id))

      return modules
    }
  }
}
</script>
