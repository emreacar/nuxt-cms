<template>
  <div class="row mx-0">
    <div
      v-if="
        data.settings.showHeader &&
          data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header yF-header mb-2 py-2 shadow-lg"
    >
      <span class="module-header-icon">
        <i class="fab fa-instagram" />
      </span>
      <span class="ml-2">
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div class="col-12">
      <div class="row">
        <div
          v-for="(i, index) in images"
          :key="index"
          class="col-4 col-sm-3 col-md-2 insta-img pl-1 pr-1 mb-2"
        >
          <img :src="i.thumbnail_src" v-on:click="popupImage(index)" class="img-fluid">
        </div>
      </div>
    </div>

    <!-- images popups -->
    <b-modal
      ref="popupImage"
      body-bg-variant="dark px-0 py-0 d-contents text-center i-modal"
      centered
      hide-footer
      hide-header
    >
      <img
        v-if="currentIndex !== -1"
        :src="images[currentIndex].display_url"
        class="img-fluid text-center"
      >
      <div v-if="images.length" class="i-pager">
        <button v-if="currentIndex > 0" v-on:click="--currentIndex" class="prev shadow">
          <i class="fas fa-angle-left" />
        </button>

        <button v-if="currentIndex + 1 < images.length" v-on:click="++currentIndex" class="next shadow">
          <i class="fas fa-angle-right" />
        </button>
      </div>
    </b-modal>
    <!-- images popups -->
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
      images: [],
      currentIndex: -1
    }
  },
  mounted () {
    this.getModuleData()
  },
  methods: {
    async getModuleData () {
      const { images } = await this.$store.dispatch('send', {
        path: 'app/module/instaFeed',
        data: {
          moduleData: this.data
        }
      })

      this.images = images.splice(0, this.data.settings.limit)
      this.loading = false
    },
    popupImage (index) {
      this.currentIndex = index
      this.$refs.popupImage.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.insta-img {
  cursor: pointer;
}
.i-modal {
  .i-pager {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 15px;
    margin-top: -30px;
    width: 100%;

    button {
      background: #ffffff;
      color: #004e97;
      font-weight: 400;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      line-height: 25px;
      margin: 0;
      padding: 0;
      text-align: center;
      outline: none;
      transition: all 0.3s;
      &.next {
        float: right;
      }

      &.prev {
        float: left;
      }

      &:hover {
        background: #004e97;
        color: #fff;
        transition: all 0.3s;
      }
    }
  }
}
</style>
