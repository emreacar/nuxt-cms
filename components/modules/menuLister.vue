<template>
  <nested-items
    :dropdown="{}"
    :items="data.settings.menuItems"
    :config="data.settings"
    :root="true"
    :position="position"
  />
</template>

<script>
import nestedItems from '@@/components/modules/menuLister/nestedItems'
export default {
  components: {
    nestedItems
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    },
    position: {
      type: String,
      default: () => { return '' }
    }
  }
}
</script>
