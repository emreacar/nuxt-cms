<template>
  <div>
    <topBar />
    <pos-header />
    <contentTop />
    <div class="row mx-0">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 position-contentTopLeft">
            <contentTopLeft />
          </div>
          <div class="col-12 col-md-6 position-contentTopRight">
            <contentTopRight />
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 position-contentLeft">
            <contentLeft />
          </div>
          <div class="col-12 col-md-4 position-content">
            <nuxt />
          </div>
          <div class="col-12 col-md-4 position-contentRight">
            <contentRight />
          </div>
        </div>
      </div>
    </div>

    <contentBottom />

    <div class="row mx-0">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 position-contentBottomLeft">
            <contentBottomLeft />
          </div>
          <div class="col-12 col-md-6 position-contentBotomRight">
            <contentBottomRight />
          </div>
        </div>
      </div>
    </div>

    <pos-footer />
  </div>
</template>

<script>
import topBar from '~/components/common/topBar.vue'
import posHeader from '~/components/common/header.vue'
import posFooter from '~/components/common/footer.vue'
import contentTop from '~/components/positions/contentTop.vue'
import contentTopLeft from '~/components/positions/contentTopLeft.vue'
import contentLeft from '~/components/positions/contentLeft.vue'
import contentRight from '~/components/positions/contentRight.vue'
import contentTopRight from '~/components/positions/contentTopRight.vue'
import contentBottom from '~/components/positions/contentBottom.vue'
import contentBottomLeft from '~/components/positions/contentBottomLeft.vue'
import contentBottomRight from '~/components/positions/contentBottomRight.vue'
export default {
  components: {
    topBar,
    posHeader,
    posFooter,
    contentTop,
    contentTopLeft,
    contentTopRight,
    contentLeft,
    contentRight,
    contentBottom,
    contentBottomLeft,
    contentBottomRight
  }
}
</script>
