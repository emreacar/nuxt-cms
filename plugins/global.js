import Vue from 'vue'

Vue.mixin({
  computed: {
    appData () {
      return this.$store.state.appData.settings
    }
  }
})
