<template>
  <div class="row justify-content-center py-4">
    <div class="col-12 pb-4">
      <div
        v-swiper:mySwiper="swiperOption"
        class="hide-arrows pb-4"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(c,i) in appData.settings.contacts"
            :key="i"
            class="swiper-slide"
          >
            <div v-on:click="showMap(c)" class="contact-item mb-2">
              <h6 v-if="c.title">
                <i class="fas fa-map-marker" />
                {{ c.title }}
              </h6>
              <p class="my-1">
                {{ c.address }}
              </p>
              <button class="btn btn-outline-info btn-block btn-sm mt-3" style="font-size: 12px;">
                İletişim & Harita
              </button>
            </div>
          </div>
        </div>
        <div class="swiper-pagination" />
      </div>
    </div>

    <b-modal id="locationMap" size="lg" hide-header hide-footer>
      <div class="row align-items-center">
        <div class="col-12 col-md-4">
          <h5>
            {{ currentLocation.title }}
          </h5>
          <p v-if="currentLocation.phone" class="mb-1">
            <i class="fas fa-phone" />
            {{ currentLocation.phone }}
          </p>
          <p v-if="currentLocation.phone2" class="mb-1">
            <i class="fas fa-phone" />
            {{ currentLocation.phone2 }}
          </p>
          <p v-if="currentLocation.email" class="mb-1">
            <i class="fas fa-envelope" />
            {{ currentLocation.email }}
          </p>
          <p v-if="currentLocation.address" class="mb-1">
            <i class="fas fa-map" />
            {{ currentLocation.address }}
          </p>
        </div>
        <div class="col-12 col-md-8">
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
      },
      swiperOption: {
        loop: true,
        direction: 'horizontal',
        autoplay: false,
        resizeReInit: true,
        effect: 'slide',
        slidesPerView: 4,
        spaceBetween: 45,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'bss-paginate-bullet',
          clickable: true
        },
        breakpoints: {
          991: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 2
          },
          480: {
            slidesPerView: 1
          }
        }
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
  border: 1px solid #1c4794;
  color: #1c4794;
  font-size: .8em;
  padding: 10px;
  min-height: 80px;
  h6 {
    margin-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    transition: all .4s;
    background: #1c4794;
    color: #fff;
  }
}
</style>
