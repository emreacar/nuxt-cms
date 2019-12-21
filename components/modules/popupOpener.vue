<template>
  <b-modal
    :id="'popupOpener_' + data._id"
    size="lg"
    body-bg-variant="white px-0 py-0 d-contents popupOpener-modal"
    centered
    hide-footer
    hide-header
  >
    <button v-on:click="closeModal()" class="close">
      <i class="fas fa-times" />
    </button>
    <div
      v-if="
        data.settings.showTitles === 'true' ||
          data.settings.showCaptions === 'true'
      "
      class="row py-4"
    >
      <div class="col-12 text-center">
        <h2 v-if="data.settings.showTitles === 'true'">
          {{ data.settings.images[0].titles[appData.settings.defaultLang] }}
        </h2>
        <p v-if="data.settings.showCaptions === 'true'" class="mb-0">
          {{ data.settings.images[0].descriptions[appData.settings.defaultLang] }}
        </p>
      </div>
    </div>
    <img
      :src="storageDir +
        data.settings.images[0].path +
        '/' +
        data.settings.images[0].filename
      "
      class="img-fluid"
    >
  </b-modal>
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
      moduleKey: 'popupOpener_' + this.data._id
    }
  },
  mounted () {
    this.checkModal()
  },
  methods: {
    checkModal () {
      const popupStorage = localStorage[this.moduleKey] || false
      if (!popupStorage) {
        this.openModal()
      } else {
        const leftTime = this.$moment()
          .diff(this.$moment(popupStorage, 'YYYY-MM-DD HH:mm:ss'), 'minutes')
        const ttl = this.data.settings.ttl || 15

        if (ttl < leftTime) {
          this.openModal()
        }
      }
    },
    openModal () {
      setTimeout(() => {
        this.$bvModal.show(this.moduleKey)
      }, this.data.settings.delay || 1000)

      localStorage[this.moduleKey] = this.$moment()
        .format('YYYY-MM-DD HH:mm:ss')
    },
    closeModal () {
      this.$bvModal.hide(this.moduleKey)
    }
  }
}
</script>

<style lang="scss" scoped>
.popupOpener-modal {
  button.close {
    position: absolute;
    right: -10px;
    top: -10px;
    background: #0D47A1;
    color: #fff;
    border-radius: 50%;
    font-size: .8em;
    width: 25px;
    height: 25px;
    line-height: 25px;
    outline: none !important;
  }
  h2 {
    font-weight: 600;
    color: #0D47A1;
  }
  p {
    font-weight: 300;
    color: #0D47A1;
  }
}
</style>
