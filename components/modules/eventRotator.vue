<template>
  <div class="row mx-0">
    <div
      v-if="
        data.settings.showTitle &&
          data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header yF-header mb-2 py-2 shadow-lg"
    >
      <span class="module-header-icon">
        <i class="fas fa-calendar-alt" />
      </span>
      <span class="ml-2">
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div class="col-12 px-0">
      <div
        v-swiper:mySwiper="swiperOption"
        :class="[
          events.length <= data.settings.eventsPerPage ? 'hide-arrows' : 'ow-hidden',
        ]"
      >
        <div class="swiper-wrapper">
          <div
            v-for="event in events"
            :key="event._id"
            class="swiper-slide pb-1"
          >
            <div class="e-item shadow-sm">
              <div class="e-date">
                <span v-if="event.customParams && event.customParams.eventDate">
                  {{ $moment(event.customParams.eventDate[appData.settings.defaultLang]).format('DD MMMM dddd') }}
                </span>
                <span v-else>
                  {{ $moment(event.createdAt).format('DD MMMM dddd') }}
                </span>
                <span class="float-right">
                  <i class="fas fa-calendar-alt" />
                </span>
              </div>

              <div class="row e-content mt-1">
                <div class="col-6 pr-1">
                  <img
                    v-if="event.modules.cover.length > 0"
                    :data-src="storageDir + event.modules.cover[0].path + '/' +event.modules.cover[0].filename"
                    src="/placeholder.jpg"
                    class="img-fluid rounded lazyload"
                  >
                  <img
                    v-else
                    src="/placeholder.jpg"
                    class="img-fluid rounded"
                  >
                </div>
                <div class="e-captions col-6 pl-1">
                  <div class="row h-100">
                    <div class="col-12">
                      <span v-if="event.customParams && event.customParams.eventTitle">
                        {{ event.customParams.eventTitle[appData.settings.defaultLang] }}
                      </span>
                      <span v-else>
                        {{ event.content[appData.settings.defaultLang].title }}
                      </span>
                    </div>

                    <div class="col-12 align-self-end">
                      <span v-if="event.customParams && event.customParams.eventCaption" class="d-block mt-2">
                        {{ event.customParams.eventCaption[appData.settings.defaultLang] }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 text-right e-category align-self-end">
                  <span v-if="event.customParams && event.customParams.eventCategory">
                    {{ event.customParams.eventCategory[appData.settings.defaultLang] }}
                  </span>
                  <span v-else>
                    {{ event.category.titles[appData.settings.defaultLang] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Optional controls -->
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      loading: true,
      events: [],
      swiperOption: {
        loop: false,
        direction: 'horizontal',
        autoplay: false,
        resizeReInit: true,
        slidesPerView: this.data.settings.eventsPerPage || 4,
        navigation: {
          nextEl: this.data.settings.arrows !== 'false' ? '.swiper-button-next' : '.no-navigation',
          prevEl: this.data.settings.arrows !== 'false' ? '.swiper-button-prev' : '.no-navigation'
        },
        breakpoints: {
          1024: {
            slidesPerView: '4'
          },
          991: {
            slidesPerView: '3'
          },
          768: {
            slidesPerView: '2'
          },
          480: {
            slidesPerView: '1'
          }
        }
      }
    }
  },
  mounted () {
    this.getModuleData()
  },
  methods: {
    async getModuleData () {
      const { events } = await this.$store.dispatch('send', {
        path: 'app/module/getEvents',
        data: {
          moduleData: this.data
        }
      })

      const sortParams = (a, b) => {
        const aSortCondDef = this.$moment(a.createdAt).format('X')
        const bSortCondDef = this.$moment(b.createdAt).format('X')
        const sortConda = a.customParams &&
          a.customParams.eventDate &&
          a.customParams.eventDate[this.appData.settings.defaultLang] &&
          a.customParams.eventDate[this.appData.settings.defaultLang] !== ''
          ? this.$moment(a.customParams.eventDate[this.appData.settings.defaultLang], 'DD/MM/YYYY').format('X')
          : aSortCondDef

        const sortCondb = b.customParams &&
          b.customParams.eventDate &&
          b.customParams.eventDate[this.appData.settings.defaultLang] &&
          b.customParams.eventDate[this.appData.settings.defaultLang] !== ''
          ? this.$moment(b.customParams.eventDate[this.appData.settings.defaultLang], 'DD/MM/YYYY').format('X')
          : bSortCondDef

        return (sortConda - sortCondb)
      }
      events.sort(sortParams)
      this.events = events
      this.loading = false
      this.updateSlider()
    },
    updateSlider () {
      if (this.data.settings.time > 0) {
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
.ow-hidden {
  overflow: hidden;
}
.hide-arrows {
  overflow: hidden;
  .swiper-button-next, .swiper-button-prev {
    display: none;
  }
}
.e-item {
  border-radius: 10px;
  background: #1d3a7a;
  background: -moz-linear-gradient(top, rgb(217,217,217) 0%, rgb(255,255,255) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgb(255,255,255)), color-stop(100%,rgb(255,255,255)));
  background: -webkit-linear-gradient(top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  background: -o-linear-gradient(top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  background: -ms-linear-gradient(top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d9d9d9', endColorstr='#ffffff',GradientType=0 );
  background: linear-gradient(to top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  padding: .5em .5em 0;
  margin: 0 .2em .5em 0;
    .e-date {
      border-bottom: 1px solid #000;
      color: #000;
      font-size: .7em;
      padding-bottom: .1em;
    }
    .e-content {
      min-height: 74px;
      .e-captions {
        font-size: .7em;
      }
      .e-category {
        font-size: .6em;
        margin-top: .5em;
        display: block;
      }
    }
}

</style>
