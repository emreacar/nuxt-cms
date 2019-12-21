<template>
  <div>
    <topBar />
    <pos-header />
    <div
      v-if="positions.CONTENT_TOP.length"
      class="row mx-0 position-contentTop"
    >
      <contentTop />
    </div>
    <div class="row mx-0">
      <div class="container">
        <div class="row">
          <contentTopLeft v-if="positions.CONTENT_TOP_LEFT.length" />
          <contentTopRight v-if="positions.CONTENT_TOP_RIGHT.length" />
        </div>
      </div>
    </div>

    <div class="row mx-0">
      <div class="container">
        <div
          :class="[
            'row',
            !positions.CONTENT_LEFT.length &&
              !positions.CONTENT_RIGHT.length
              ? 'justify-content-center'
              : ''
          ]"
        >
          <div
            v-if="positions.CONTENT_LEFT.length"
            class="col-12 col-md-3 position-contentLeft"
          >
            <contentLeft />
          </div>
          <div
            :class="[
              'col-12 position-content',
              positions.CONTENT_LEFT.length &&
                positions.CONTENT_RIGHT.length
                ? 'col-md-6'
                : '',
              (!positions.CONTENT_LEFT.length &&
                positions.CONTENT_RIGHT.length) ||
                (positions.CONTENT_LEFT.length &&
                !positions.CONTENT_RIGHT.length)
                ? 'col-md-9'
                : '',
              !positions.CONTENT_LEFT.length &&
                !positions.CONTENT_RIGHT.length
                ? 'col-md-12'
                : ''
            ]"
          >
            <nuxt />
          </div>
          <div
            v-if="positions.CONTENT_RIGHT.length"
            class="col-12 col-md-3 position-contentRight"
          >
            <contentRight />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="positions.CONTENT_BOTTOM.length"
      class="row mx-0 position-contentBottom"
    >
      <contentBottom />
    </div>

    <div class="row mx-0">
      <div class="container">
        <div class="row">
          <div
            v-if="positions.CONTENT_BOTTOM_LEFT.length"
            class="col-12 col-md-6 position-contentBottomLeft"
          >
            <contentBottomLeft />
          </div>
          <div
            v-if="positions.CONTENT_BOTTOM_RIGHT.length"
            class="col-12 col-md-6 position-contentBotomRight"
          >
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
  },
  computed: {
    positions () {
      return this.$store.state.positions
    }
  }
}
</script>
