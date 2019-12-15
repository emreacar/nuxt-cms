<template>
  <div
    v-swiper:mySwiper="swiperOption"
    :class="[
      data.settings.arrows !== 'true' ? 'hide-arrows' : '',
      data.settings.pagination === 'true' ? 'pb-4' : ''
    ]"
  >
    <div
      v-if="
        data.settings.showHeader &&
          data.settings[appData.settings.defaultLang]
      "
      class="slider-head"
    >
      <h1>
        {{ data.settings[appData.settings.defaultLang] }}
      </h1>
    </div>
    <div
      :class="[
        'swiper-wrapper',
        data.settings.showHeader ? 'swiper-bordered' : ''
      ]"
    >
      <div
        v-for="image in images"
        :key="image._id"
        class="swiper-slide"
      >
        <div
          :style="[
            data.settings.padding
              ? {'padding': '0 ' + data.settings.padding + 'px'}
              : {}
          ]"
          class="d-block"
        >
          <img
            :src="storageDir + image.path + '/' + image.filename"
            :alt="image.titles ? (image.titles[appData.settings.defaultLang] || '') : ''"
            class="img-fluid"
          >
        </div>
        <div
          v-if="
            data.settings.showTitles ||
              data.settings.showCaptions
          "
          class="caption"
        >
          <h1
            v-if="
              data.settings.showTitles &&
                image.titles &&
                image.titles[appData.settings.defaultLang]
            "
            class="caption-title"
          >
            {{ image.titles[appData.settings.defaultLang] }}
          </h1>
          <p
            v-if="
              data.settings.showCaptions &&
                image.descriptions &&
                image.descriptions[appData.settings.defaultLang]
            "
            class="caption-desc"
          >
            {{ image.descriptions[appData.settings.defaultLang] }}
          </p>
        </div>
      </div>
    </div>
    <!-- Optional controls -->
    <div class="swiper-pagination" />
    <div class="swiper-button-prev" />
    <div class="swiper-button-next" />
  </div>
</template>

<script>
import orderBy from 'lodash.orderby'

export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      pagination: {
        total: 0,
        current: 0
      },
      swiperOption: {
        loop: false,
        direction: 'horizontal',
        autoplay: false,
        resizeReInit: true,
        effect: this.data.settings.animation || 'slide',
        slidesPerView: this.data.settings.slidesPerView || 1,
        spaceBetween: 45,
        pagination: {
          el: this.data.settings.pagination !== 'false' ? '.swiper-pagination' : '.no-paginate',
          bulletClass: 'bss-paginate-bullet',
          clickable: true
        },
        navigation: {
          nextEl: this.data.settings.arrows !== 'false' ? '.swiper-button-next' : '.no-navigation',
          prevEl: this.data.settings.arrows !== 'false' ? '.swiper-button-prev' : '.no-navigation'
        },
        breakpoints: {
          480: {
            slidesPerView: '2'
          },
          320: {
            slidesPerView: '1'
          }
        }
      }
    }
  },
  computed: {
    images () {
      return orderBy(this.data.settings.images, 'priority', 'asc')
    }
  },
  mounted () {
    this.updateSlider()
  },
  destroyed () {
    this.mySwiper.off('slideChange')
  },
  methods: {
    slidePrev () {
      this.mySwiper.slidePrev()
    },
    slideNext () {
      this.mySwiper.slideNext()
    },
    slideGoIndex (index) {
      this.mySwiper.slideTo(index)
    },
    updateSlider () {
      if (this.data.settings.auto) {
        this.mySwiper.params.autoplay = {
          delay: this.data.settings.time || 5000
        }
        this.mySwiper.autoplay.start()
      }
      this.mySwiper.update()
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-arrows {
  .swiper-button-next, .swiper-button-prev {
    display: none;
  }
}
.swiper-pagination {
  bottom: 0px;
}
.slider-head {
  h1 {
    text-align: center;
    color: #004e97;
    font-size : 1.1em;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 10px;
    margin-bottom: 0;
  }
}
.swiper-bordered {
  padding: 20px 0;
  border-top: 4px solid #004e97;
  border-bottom: 4px solid #004e97;
}
.swiper-slide {
  .caption {
    position: absolute;
    bottom: 10px;
    left: 0;
    h1.caption-title {
      font-weight: 400;
      font-size: 1em;
      margin-bottom: .1em;
    }
    p.caption-desc {
      font-size: .7em;
      font-weight: 300;
      margin-bottom: 0;
    }
  }
}
</style>
