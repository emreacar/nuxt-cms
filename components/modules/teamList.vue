<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component
    v-bind:is="tlTemplate"
    :data="data"
  />
</template>

<script>
import grouped from '@@/components/modules/teamList/grouped'
import list from '@@/components/modules/teamList/list'

export default {
  components: {
    grouped,// eslint-disable-line
    list// eslint-disable-line
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      tlTemplate: this.data.settings.grouped && this.data.settings.grouped === 'true' ? 'grouped' : 'list'
    }
  }
}
</script>

<style lang="scss" scoped></style>
