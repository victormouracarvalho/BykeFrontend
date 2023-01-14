<template>
  <div style="height:600px; width:800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[45.779152085757225, 4.868157419346505]">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          :attribution="attribution"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import 'leaflet'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 15,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
};
</script>

<style></style>