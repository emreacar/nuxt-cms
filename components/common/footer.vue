<template>
  <footer>
    <div class="w-100 d-block top-bg-image px-0">
      <img src="/footer-top-bg.svg" class="img-fluid">
    </div>
    <div class="row mx-0 position-footer py-4">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-12 col-md-auto f-block">
            A
          </div>
          <div
            v-if="appData.settings && appData.settings.social"
            class="col-12 col-md-auto f-block"
          >
            <div class="w-100 px-4 s-items">
              <a
                v-for="(href, social) in appData.settings.social"
                :key="social"
                :href="href"
                target="_blank"
                class="s-item mb-2"
              >
                <i :class="['fab', 'fa-'+social]" />
                {{ social }}
              </a>
            </div>
          </div>
          <div class="col-12 col-md-auto f-block">
            <div class="px-4 w-100">
              <dynamic-loader
                v-for="m in mainFooterModule"
                :key="m._id"
                :data="m"
                position="footer"
              />
            </div>
          </div>
          <div class="col-12 col-md-auto f-block">
            <dynamic-loader
              v-for="m in positionsModules"
              :key="m._id"
              :data="m"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-right copyright">
            © 2020 Bursa Büyükşehir Belediye Spor Kulübü. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dynamicLoader from '@@/components/dynamicLoader'

export default {
  components: {
    dynamicLoader
  },
  computed: {
    positionsModules () {
      return this.appData.staticModules.filter(m => m.showOnFooter && m.module !== 'menuLister')
    },
    mainFooterModule () {
      return this.appData.staticModules.filter(m => m.module === 'menuLister' && m.showOnFooter)
    }
  }
}
</script>
