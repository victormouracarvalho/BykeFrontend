<template>
  <l-map ref="map" v-model:zoom="zoom" :center="center" :minZoom="3" :maxZoom="18">
    <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution"
    ></l-tile-layer>

    <template v-for="step in steps" :key="step.id">
      <l-marker :lat-lng="[+step.latitude, +step.longitude]" :icon="icons[step.id]">
        <l-popup> {{ step.location }}</l-popup>
      </l-marker>
    </template>

    <l-polyline
        :lat-lngs="polyline"
        color="gray"
    />
  </l-map>
</template>

<script lang="ts">
import 'leaflet'
import "leaflet/dist/leaflet.css";
import { LMap, LMarker, LPolyline, LPopup, LTileLayer } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { Step } from "@/common/types";

export default defineComponent({
  name: "LeafletMap",
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      default() {
        return []
      },
    },
    path: {
      type: Array as PropType<number[]>,
      default() {
        return []
      },
    },
    initialZoom: {
      type: Number,
      default: 15,
    },
    center: {
      type: Array,
      default() {
        return [45.779152085757225, 4.868157419346505]
      },
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolyline,
  },
  data() {
    return {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: this.initialZoom,
    }
  },
  computed: {
    dict() {
      return this.steps.reduce((acc, step) => {
        acc[step.id] = step;
        return acc;
      }, {} as { [key: number]: Step });
    },
    polyline() {
      return this.path.map((id) => [this.dict[id].latitude, this.dict[id].longitude]);
    },
    start() {
      return this.path.length > 0 ? this.path[0] : null;
    },
    end() {
      return this.path.length > 1 ? this.path[this.path.length - 1] : null;
    },
    icons() {
      const icons = {} as { [key: number]: L.DivIcon };
      for (const id in this.dict) {
        if (+id === this.start) {
          icons[id] = L.divIcon({
            className: 'start-icon',
            html: '<svg class="bi" width="24" height="24"><use xlink:href="#1-circle-fill"></use></svg>',
            iconSize: [24, 24],
          })
        } else if (+id === this.end) {
          icons[id] = L.divIcon({
            className: 'end-icon',
            html: '<svg class="bi" width="24" height="24"><use xlink:href="#geo"></use></svg>',
            iconSize: [24, 24],
            iconAnchor: [12, 20],
          })
        } else {
          icons[id] = L.divIcon({
            className: 'step-icon',
            html: '<svg class="bi" width="24" height="24"><use xlink:href="#pin"></use></svg>',
            iconSize: [24, 24],
            iconAnchor: [12, 24]
          })
        }
      }
      return icons
    },
  }
});
</script>

<style></style>