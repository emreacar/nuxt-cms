import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      storageDir: process.env.STORAGE_DIR
    }
  },
  computed: {
    appData () {
      return this.$store.state.appData
    }
  }
})
