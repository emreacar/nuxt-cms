<template>
  <div class="row justify-content-center py-4">
    <div v-for="(c,i) in appData.settings.contacts" :key="i" class="col-12 col-md-6 mb-4">
      <div class="w-100 d-block h-100 py-2 px-2 contact-item shadow-sm">
        <h6 v-if="c.title">
          {{ c.title }}
        </h6>
        <p v-if="c.phone" class="mb-1">
          <i class="fas fa-phone" />
          {{ c.phone }}
        </p>
        <p v-if="c.phone2" class="mb-1">
          <i class="fas fa-phone" />
          {{ c.phone2 }}
        </p>
        <p v-if="c.email" class="mb-1">
          <i class="fas fa-envelope" />
          {{ c.email }}
        </p>
        <p v-if="c.address" class="mb-1">
          <i class="fas fa-map" />
          {{ c.address }}
          <br>
          <button v-on:click="showMap(c)" class="mt-4 text-right btn btn-sm btn-light">
            <i class="fas fa-map-marker" />
            Harita
          </button>
        </p>
      </div>
    </div>

    <b-modal id="locationMap" size="lg" hide-header hide-footer>
      <div class="d-block text-center">
        <h5>
          {{ currentLocation.title }}
        </h5>
        <GmapMap
          :center="{
            lat: Number(currentLocation.mapCoords[0]),
            lng: Number(currentLocation.mapCoords[1])
          }"
          :zoom="14"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        >
          <GmapMarker
            :position="{
              lat: Number(currentLocation.mapCoords[0]),
              lng: Number(currentLocation.mapCoords[1])
            }"
          />
        </GmapMap>
      </div>
      <b-button v-on:click="$bvModal.hide('locationMap')" class="mt-3" block>
        <i class="fas fa-times" /> Haritayı Gizle
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentLocation: {
        mapCoords: '0,0'
      }
    }
  },
  methods: {
    showMap (location) {
      this.currentLocation = { ...location }
      this.currentLocation.mapCoords = location.mapCoords.split(',')
      this.$bvModal.show('locationMap')
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-item {
  border-radius: 12px;
  background: #1c4794 !important;
  color: #fff;
  font-size: .8em;
}
</style>
