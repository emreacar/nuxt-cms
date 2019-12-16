<template>
  <div class="row mx-0">
    <div
      v-if="
        data.settings.showHeader &&
          data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header yF-header mb-3 py-2 shadow-lg"
    >
      <span class="module-header-icon">
        <i class="fab fa-instagram" />
      </span>
      <span class="ml-2">
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div class="col-12 px-0">
      <div class="row">
        <div
          v-for="(i, index) in images"
          :key="index"
          class="col-3 col-md-2"
        >
          <img :src="i.thumbnail_src" class="img-fluid">
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
  data () {
    return {
      loading: true,
      images: []
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
    }
  }
}
</script>
