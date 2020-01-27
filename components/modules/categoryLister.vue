<template>
  <div class="row mx-0 page-category">
    <div
      v-if="data.settings.showTitle &&
        data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header yF-header mb-2 py-2 shadow-lg"
    >
      <span class="module-header-icon mr-2">
        <i class="fas fa-newspaper" />
      </span>
      <span>
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div class="col-12 mb-2">
      <div class="row">
        <div
          v-for="c in data.content"
          :key="c._id"
          class="col-12 col-md-3 page-category-item mb-2 pl-1 pr-1"
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
            <div class="position-relative shadow-sm">
              <img
                v-if="c.modules.cover.length"
                :data-src="storageDir + c.modules.cover[0].path + '/' + c.modules.cover[0].filename"
                src="/placeholder.jpg"
                class="img-fluid lazyload"
              >
              <img
                v-else
                src="/placeholder.jpg"
                class="img-fluid"
              >
              <div class="item-title">
                <div class="item-category">
                  {{ c.category.titles[appData.settings.defaultLang] }}
                </div>
                {{ c.content[appData.settings.defaultLang].title }}
              </div>
              <div class="bg-mask" />
            </div>
          </nuxt-link>
        </div>
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
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-category {
  .page-category-item {
    .position-relative {
      border-radius: 12px;
      img {
        border-radius: 12px;
      }
      .item-title {
        position: absolute;
        bottom: 4px;
        left: 0px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 1rem;
        color: #fff;
        z-index: 3;
        .item-category {
          font-size: .7rem;
        }
      }
      .bg-mask {
        z-index: 2;
        height: 60%;
        width: 100%;
        bottom: 0;
        left: 0;
        border-radius: 12px;
        position: absolute;
        background: #1d3a7a17;
        background: -moz-linear-gradient(top, rgba(28,59,122, 1) 15%, rgba(28,59,122, 0) 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(15%,rgba(28,59,122, 1)), color-stop(100%,rgba(28,59,122, 0)));
        background: -webkit-linear-gradient(top, rgba(28,59,122, 1) 15%,rgba(28,59,122, 0) 100%);
        background: -o-linear-gradient(top, rgba(28,59,122, 1) 15%,rgba(28,59,122, 0) 100%);
        background: -ms-linear-gradient(top, rgba(28,59,122, 1) 15%,rgba(28,59,122, 0) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1d3a7a', endColorstr='#1d3a7a',GradientType=0 );
        background: linear-gradient(to top, rgba(28,59,122, 1) 15%,rgba(28,59,122, 0) 100%);
      }
    }
  }
}

@media (max-width: 767px) {
  .page-category .page-category-item .position-relative {
    .item-category {
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: .9rem;
    }
    .item-title {
      font-size: 1.2em;
    }
  }
}
</style>
