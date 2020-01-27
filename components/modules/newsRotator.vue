<template>
  <div v-if="contents.length" class="nR-wrapper row">
    <div class="col-12 pr-md-1 nR-preview col-md-8">
      <div ref="swiperTop" v-swiper:nrPreview="swiperPreviewOption">
        <div class="swiper-wrapper">
          <div
            v-for="c in contents"
            :key="c._id"
            class="swiper-slide"
          >
            <nuxt-link
              :to="{
                name: 'content-slug',
                params: {
                  slug: c.content[appData.settings.defaultLang].slug,
                  content: c
                }
              }
              "
            >
              <img
                :data-src="
                  storageDir +
                  c.modules.cover[0].path +
                  '/' +
                  c.modules.cover[0].filename
                "
                src="/placeholder.jpg"
                class="img-fluid lazyload"
              >
              <div class="caption">
                <h1 v-if="c.content[appData.settings.defaultLang]">
                  {{ c.content[appData.settings.defaultLang].title }}
                </h1>
                <p>
                  {{ c.content[appData.settings.defaultLang].content.replace(stripRegex, "").substr(0, 75) }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 pl-md-1 nR-thumbs">
      <div ref="nrHeader" v-if="data.settings.showTitle == 'true'" class="nR-header d-none d-md-block">
        <h1>
          {{ data.settings[appData.settings.defaultLang] }}
        </h1>
      </div>
      <div
        ref="swiperThumbs"
        v-swiper:nrItems="swiperItemsOption"
        :style="{maxHeight: maxHeight + 'px'}"
      >
        <div class="swiper-wrapper">
          <div
            v-for="c in contents"
            :key="c._id"
            class="swiper-slide"
          >
            <div class="row mx-2 my-1 py-1 align-items-center">
              <div class="col-8 d-none d-md-block nR-caption">
                <p v-if="c.content[appData.settings.defaultLang]" class="nR-title text-truncate">
                  {{ c.content[appData.settings.defaultLang].title }}
                </p>
                <p v-if="c.category.titles[appData.settings.defaultLang]" class="nR-category">
                  {{ c.category.titles[appData.settings.defaultLang] }}
                </p>
              </div>

              <div v-if="c.modules.cover.length" class="col-12 col-md-4 px-2">
                <img
                  :data-src="
                    storageDir +
                    c.modules.cover[0].path +
                    '/' +
                    c.modules.cover[0].filename
                  "
                  src="/placeholder.jpg"
                  class="img-fluid lazyload"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- navigation arrows -->
      <div class="nav-arrows d-none d-md-block">
        <button class="nav-arrow-button nav-arrow-next">
          <i class="fas fa-angle-down" />
        </button>

        <button class="nav-arrow-button nav-arrow-prev">
          <i class="fas fa-angle-up" />
        </button>
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
    },
    position: {
      type: String,
      default: () => { return 'default' }
    }
  },
  data () {
    return {
      loading: true,
      stripRegex: /(<([^>]+)>)/ig,
      maxHeight: 325,
      contents: [],
      swiperPreviewOption: {
        speed: 600,
        effect: 'slide',
        loop: {
          loopedSlides: 5
        },
        loopedSlides: 5,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        breakpoints: {
          480: {
            loopedSlides: 3,
            loop: {
              loopedSlides: 3
            }
          },
          880: {
            loopedSlides: 4,
            loop: {
              loopedSlides: 4
            }
          }
        }
      },
      swiperItemsOption: {
        loop: {
          loopedSlides: 5
        },
        loopedSlides: 5,
        slideToClickedSlide: true,
        speed: 600,
        autoplay: {
          delay: this.data.settings.time || 5000
        },
        on: {
          resize: () => {
            this.swiperInit()
          }
        },
        direction: 'vertical',
        navigation: {
          nextEl: '.nav-arrow-next',
          prevEl: '.nav-arrow-prev'
        },
        slidesPerView: 5,
        watchSlidesVisibility: true,
        breakpoints: {
          480: {
            slidesPerView: 3,
            loopedSlides: 3,
            loop: {
              loopedSlides: 3
            }
          },
          880: {
            slidesPerView: 4,
            loopedSlides: 4,
            loop: {
              loopedSlides: 4
            }
          }
        }
      }
    }
  },
  mounted () {
    this.getModuleData()
  },
  methods: {
    swiperInit () {
      if (this.contents.length > 0) {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper

        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
        if (window.innerWidth < 768) {
          swiperThumbs.changeDirection('horizontal')
        } else {
          swiperThumbs.changeDirection('vertical')
        }

        setTimeout(() => {
          const swTopHeight = this.$refs.swiperTop.swiper.height
          const nrHeaderHeight = this.$refs.nrHeader.clientHeight
          this.maxHeight = swTopHeight - nrHeaderHeight - 3

          swiperThumbs.updateSize()
        }, 300)
      }
    },
    async getModuleData () {
      const { contents } = await this.$store.dispatch('send', {
        path: 'page/contents',
        data: {
          params: {
            category: this.data.settings.categories,
            limit: this.data.settings.limit
          }
        }
      })

      this.contents = contents
      this.loading = false
      this.$nextTick(() => {
        this.swiperInit()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nR-wrapper {
  .nR-header {
    border-bottom: 3px solid #1d4895;
    padding: 5px 0;
    h1 {
      padding-left: 15px;
      font-weight: 600;
      margin-bottom: 0px;
      font-size: 1.2em;
      color: #1d4895;
    }
  }
  .nR-preview {
    border-radius: 12px;
    .swiper-slide {
      border-radius: 12px;
      overflow: hidden;
    }
    .caption {
      position: absolute;
      width: 100%;
      color: #fff;
      bottom: 0;
      padding: 30px 30px 0;
      background: #1d3a7a;
      background: -moz-linear-gradient(top, rgba(28,59,122, 1) 10%, rgba(28,59,122, 0) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(10%,rgba(28,59,122, 1)), color-stop(100%,rgba(28,59,122, 0)));
      background: -webkit-linear-gradient(top, rgba(28,59,122, 1) 10%,rgba(28,59,122, 0) 100%);
      background: -o-linear-gradient(top, rgba(28,59,122, 1) 10%,rgba(28,59,122, 0) 100%);
      background: -ms-linear-gradient(top, rgba(28,59,122, 1) 10%,rgba(28,59,122, 0) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1d3a7a', endColorstr='#1d3a7a',GradientType=0 );
      background: linear-gradient(to top, rgba(28,59,122, 1) 10%,rgba(28,59,122, 0) 100%);
      h1 {
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 1.8em;
      }
      p {
        font-weight: 300;
      }
    }
  }
  .nR-thumbs {
    .swiper-slide {
      .row {
        border: 2px solid #fff;
        border-radius: 12px;
        background: #ffffff;
        background: -moz-linear-gradient(top, #d0d0d0 0%, #ffffff 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#d0d0d0), color-stop(100%,#ffffff));
        background: -webkit-linear-gradient(top, #d0d0d0 0%,#ffffff 100%);
        background: -o-linear-gradient(top, #d0d0d0 0%,#ffffff 100%);
        background: -ms-linear-gradient(top, #d0d0d0 0%,#ffffff 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d0d0d0', endColorstr='#ffffff',GradientType=0 );
        background: linear-gradient(to top, #d0d0d0 0%,#ffffff 100%);
        box-shadow: 0px 1px 3px 0.07px rgba(64, 64, 64, 0.86);
        transition: all .6s;
        .nR-caption {
          color: #1d4895;
          p {
            margin-bottom: 0;
          }
          .nR-title {
            font-size: .9em;
            font-weight: 600;
          }
          .nR-category {
            font-size: .7em;
          }
        }
        img {
          border-radius: 12px;
        }
      }

      &.swiper-slide-active {
        .row {
          background: #2d5fcd;
          background: -moz-linear-gradient(top, #142d63 0%, #2d5fcd 100%);
          background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#142d63), color-stop(100%,#2d5fcd));
          background: -webkit-linear-gradient(top, #142d63 0%,#2d5fcd 100%);
          background: -o-linear-gradient(top, #142d63 0%,#2d5fcd 100%);
          background: -ms-linear-gradient(top, #142d63 0%,#2d5fcd 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#142d63', endColorstr='#2d5fcd',GradientType=0 );
          background: linear-gradient(to top, #142d63 0%,#2d5fcd 100%);
          transition: all .6s;
          .nR-caption {
            color: #fff;
          }
        }
      }
    }
  }
  .nav-arrows {
    position: absolute;
    top: 0;
    right: 15px;
    .nav-arrow-button {
      background: none;
      outline: none !important;
      border: none;
      padding: 1px;
      font-size: 2em;
      line-height: 1em;
      color: #2750aa;
    }
  }
}
@media (min-width: 425px) and (max-width: 767px) {
 .nR-thumbs {
   .swiper-slide {
     .row {
       border: none;
       border-radius: 0px !important;
       background: none !important;
       box-shadow: none !important;
      .col-12 {
        padding: 0 !important;
        img {
          box-shadow: 0px 1px 3px 0.07px rgba(64, 64, 64, 0.86);
          border-radius: 12px;
        }
      }
     }
   }
 }
}
@media (max-width: 425px) {
  .nR-wrapper {
    .nR-preview {
      .caption {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
