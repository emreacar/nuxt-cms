<template>
  <div class="row mx-0 my-2 position-header">
    <div class="container">
      <div class="row">
        <div class="col-12 bbs-logo col-md-4 pr-md-0">
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

        <div class="col-12 col-md-8 ml-auto">
          <div class="row h-100">
            <div class="col-12 col-md-6 ml-auto header-module-pos pt-md-2">
              <dynamic-loader
                v-for="m in positionsModules"
                :key="m._id"
                :data="m"
              />
            </div>
            <div class="col-12 header-menu-pos align-self-end">
              <dynamic-loader
                v-for="m in mainNavModule"
                :key="m._id"
                :data="m"
                position="headerNav"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dynamicLoader from '@@/components/dynamicLoader'

export default {
  components: {
    dynamicLoader
  },
  computed: {
    positionsModules () {
      return this.appData.staticModules.filter(m => m.showOnHeader)
    },
    mainNavModule () {
      return this.appData.staticModules.filter(m => m.module === 'menuLister' && m.settings.isMainNav)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  .logo-img {
    width: 100%;
    max-width: 400px;
  }
}
</style>
