<template>
  <div class="container">
    <h1>Nouvelle sortie</h1>

    <BikeSelector v-model="excursion.bikeId" />

    <DatetimeInput name="Départ" v-model="excursion.departure"></DatetimeInput>

    <PathSelector v-model="path"></PathSelector>

    <div >
      <button type="button" class="btn btn-primary mr-2" @click="create">Ajouter<svg class="bi mx-2 mb-1" width="20" height="20"><use xlink:href="#check-square" fill="white"></use></svg></button>
    </div>
  </div>

  <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
    <LeafletMap :steps="path?.steps ?? []" :path="mapPath" :initial-zoom="10"/>
  </div>
</template>


<script lang="ts">
import ApiService from "../common/api.service";
import { defineComponent } from "vue";
import type { ExcursionPayload, FullPath } from "@/common/types";
import PathSelector from "@/components/PathSelector.vue";
import BikeSelector from "@/components/BikeSelector.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import DatetimeInput from "@/components/DatetimeInput.vue";

export default defineComponent({
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
    }
  },
  data() {
    return {
      excursion: {
        userId: this.$store.state.auth.userId,
        bikeId: 0,
        pathId: 0,
        departure: new Date(),
      } as ExcursionPayload,
      path: null as FullPath | null,
    };
  },
  methods:{
    async create(){
      if (this.path === null) {
        alert("Veuillez sélectionner un trajet");
        return;
      }
      this.excursion.pathId = this.path.id
      await ApiService.excursions.create(this.excursion)
      this.$router.push({name: "sortie-list"})
    }
  },
  computed: {
    mapPath() {
      if (this.path === null) {
        return [];
      }
      return this.path.steps.map(step => step.id)
    },
  },
  components: {DatetimeInput, LeafletMap, BikeSelector, PathSelector},
});
</script>