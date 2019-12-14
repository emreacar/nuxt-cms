<template>
  <div class="row mx-0 position-header">
    <div class="container">
      <div class="row">
        <div class="col-12 bbs-logo col-md-4">
          <a class="logo">
            <img
              :src="
                storageDir +
                appData.settings.brands.logo.path +
                '/' +
                appData.settings.brands.logo.filename
              "
              class="logo-img img-fluid"
              alt="logo"
            >
          </a>
        </div>

        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 header-module-pos">
              {{ modules }}
            </div>
            <div class="col-12 header-menu-pos">
              {{ navigation }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    modules () {
      const showOnHeader = this.appData.staticModules.filter(m => m.showOnHeader)

      return showOnHeader[0] || {}
    },
    navigation () {
      const navModuleData = this.appData.staticModules.filter(m => m.module === 'menuLister' && m.settings.isMainNav)

      return navModuleData[0] || {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
