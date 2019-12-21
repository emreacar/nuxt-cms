<template>
  <div>
    <topBar />
    <pos-header />
    <nuxt />
    <pos-footer />
  </div>
</template>

<script>
import topBar from '~/components/common/topBar.vue'
import posHeader from '~/components/common/header.vue'
import posFooter from '~/components/common/footer.vue'
export default {
  components: {
    topBar,
    posHeader,
    posFooter
  }
}
</script>
