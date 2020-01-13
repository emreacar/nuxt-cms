<template>
  <div ref="posHeader" class="row mx-0 mt-2 mb-4 position-header">
    <div class="container">
      <div class="row position-relative">
        <div class="col-10 bbs-logo col-md-4 pr-md-0">
          <nuxt-link to="/" class="logo">
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
          </nuxt-link>
        </div>
        <div class="d-block pt-4 d-md-none col-2 pl-0 text-right">
          <button v-on:click="toggleModule()" class="btn btn-sm btn-primary">
            <i class="fas fa-bars" />
          </button>
        </div>
        <div
          ref="headerModules"
          :class="['col-12 col-md-8 ml-md-auto header-modules', (mobileMenuStatus ? 'opened' : '')]"
        >
          <div class="row h-100">
            <div class="col-12 pt-2 d-block d-md-none text-right">
              <button v-on:click="toggleModule()" class="btn btn-sm btn-outline-primary">
                Gizle <i class="fas fa-long-arrow-alt-right" />
              </button>
            </div>
            <div class="col-12 col-md-6 order-2 order-md-1 ml-auto header-module-pos pt-lg-2">
              <dynamic-loader
                v-for="m in positionsModules"
                :key="m._id"
                :data="m"
              />
            </div>
            <div class="col-12 order-1 order-md-2 header-menu-pos align-self-md-end">
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
  data () {
    return {
      mobileMenuStatus: false
    }
  },
  computed: {
    positionsModules () {
      return this.appData.staticModules.filter(m => m.showOnHeader)
    },
    mainNavModule () {
      return this.appData.staticModules.filter(m => m.module === 'menuLister' && m.settings.isMainNav)
    }
  },
  watch: {
    $route () {
      this.mobileMenuStatus = false
    }
  },
  methods: {
    toggleModule () {
      this.mobileMenuStatus = !this.mobileMenuStatus
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

@media (max-width: 768px) {
  .header-modules {
    background: rgba(255, 255, 255, .9);
    transition: right 0.4s;
    position: fixed;
    display: none;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 12;
    &.opened {
      display: block;
    }

    &> .row.h-100 {
      height: auto !important;
    }
  }
}
</style>
