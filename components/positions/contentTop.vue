<template>
  <div v-if="modules.length" class="container">
    <div class="row">
      <div
        v-for="m in modules"
        :key="m._id"
        :class="[
          'col-12 mb-4 px-2',
          (m.settings.colSM ? 'col-sm-'+m.settings.colSM : ''),
          (m.settings.colMD ? 'col-md-'+m.settings.colMD : ''),
          (m.settings.colLG ? 'col-lg-'+m.settings.colLG : ''),
          (m.settings.colXL ? 'col-xl-'+m.settings.colXL : '')
        ]"
      >
        <dynamic-loader :data="m" />
      </div>
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
      const moduleIds = this.$store.state.positions.CONTENT_TOP || []
      const modules = this.$store.state.modules
        .filter(module => moduleIds.includes(module._id))
        .sort((a, b) => moduleIds.indexOf(a._id) - moduleIds.indexOf(b._id))

      return modules
    }
  }
}
</script>
