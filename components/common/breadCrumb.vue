<template>
  <div class="row mx-0 my-1">
    <div class="container">
      <div class="row position-relative">
        <div class="col-12">
          <ul v-if="crumbs.length" class="b-crumb mb-0">
            <li>
              <nuxt-link to="/">
                <i class="fas fa-home" />
              </nuxt-link>
            </li>
            <li v-for="(c,index) in crumbs" :key="index">
              <span>
                <i class="fas fa-angle-right" />
              </span>
              <nuxt-link :to="c.to">
                {{ c.title }}
              </nuxt-link>
            </li>
            <li>
              <span>
                <i class="fas fa-angle-right" />
              </span>
              {{ $store.state.page.title[$store.state.appData.settings.defaultLang] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    crumbs () {
      return this.$store.state.pagePath
    }
  }
}
</script>
