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
  },
  methods: {
    shareThis (target, title = '', caption = '') {
      const links = {
        'twitter': {
          href: 'https://twitter.com/intent/tweet?text=%title%&url=%url%',
          popup: true
        },
        'facebook': {
          href: 'http://www.facebook.com/sharer/sharer.php?u=%url%',
          popup: true
        },
        'email': {
          href: 'mailto:?subject=%title%&body=%url%',
          popup: false
        },
        'whatsapp': {
          href: 'https://wa.me/whatsappphonenumber/?text=%url%',
          popup: false
        }
      }

      const network = links[target]
      network.href = network.href
        .replace(
          '%url%',
          window.location.href
        )
        .replace(
          '%title%',
          title
        )

      window.open(
        network.href,
        !network.popup ? '_blank' : '',
        network.popup ? 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600' : ''
      )

      return false
    }
  }
})
