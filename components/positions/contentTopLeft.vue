<template>
  <div
    v-if="modules.length"
    :class="[
      'col-12',
      modules[0].settings.colSM ? 'col-sm-' + modules[0].settings.colSM : '',
      modules[0].settings.colMD ? 'col-md-' + modules[0].settings.colMD : '',
      modules[0].settings.colLG ? 'col-lg-' + modules[0].settings.colLG : ''
    ]"
  >
    <div class="row">
      <div
        v-for="m in modules"
        :key="m._id"
        class="col-12 mb-2"
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
      const moduleIds = this.$store.state.positions.CONTENT_TOP_LEFT || []
      const modules = this.$store.state.modules
        .filter(module => moduleIds.includes(module._id))
        .sort((a, b) => moduleIds.indexOf(a._id) - moduleIds.indexOf(b._id))

      return modules
    }
  }
}
</script>
