<template>
  <nested-items
    :dropdown="{}"
    :items="data.settings.menuItems"
    :config="data.settings"
    :root="true"
    :position="position"
  />
</template>

<script>
import nestedItems from '@@/components/modules/menuLister/nestedItems'
export default {
  components: {
    nestedItems
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    },
    position: {
      type: String,
      default: () => { return '' }
    }
  },
  watch: {
    $route () {
      this.setActiveLink()
    }
  },
  mounted () {
    this.setActiveLink()
  },
  methods: {
    setActiveLink () {
      if (!process.server) {
        const oldLinks = document.getElementsByClassName('activeNavLink')
        const links = document.getElementsByClassName('nuxt-link-exact-active')

        for (let i = 0; i < oldLinks.length; i++) {
          oldLinks[i].classList.remove('activeNavLink')
        }

        for (let i = 0; i < links.length; i++) {
          if (links[i].classList.contains('mP-subLink')) {
            const parentLinks = links[i].parentElement
              .parentElement
              .parentElement
              .getElementsByClassName('mP-link')

            parentLinks[0].classList.add('activeNavLink')
          }
        }
      }
    }
  }
}
</script>
