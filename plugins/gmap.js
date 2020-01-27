import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBPiemL5ro_FGe7Pbd7AUdD6W0udFYoilk',
    libraries: 'places'
  }
})
