<template>
  <div>
    <topBar />
    <pos-header />
    <bread-crumb />
    <div
      v-if="positions.CONTENT_TOP.length"
      class="row mx-0 position-contentTop"
    >
      <contentTop />
    </div>
    <pos-footer />
  </div>
</template>

<script>
import topBar from '~/components/common/topBar.vue'
import posHeader from '~/components/common/header.vue'
import breadCrumb from '~/components/common/breadCrumb.vue'
import posFooter from '~/components/common/footer.vue'
import contentTop from '~/components/positions/contentTop.vue'
export default {
  components: {
    topBar,
    posHeader,
    breadCrumb,
    posFooter,
    contentTop
  },
  computed: {
    positions () {
      return this.$store.state.positions
    }
  }
}
</script>
