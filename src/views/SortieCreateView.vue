<template>
  <div class="container">
    <h1>Nouvelle sortie</h1>

    <BikeSelector v-model="excursion.bykeId" />

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Date de départ</span>
      </div>
      <input type="text" id="departure" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="excursion.departure">
    </div>

    <PathSelector v-model="path"></PathSelector>

    <div >
      <button type="button" class="btn btn-primary mr-2" @click="create">Ajouter</button>
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

export default defineComponent({
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
    }
  },
  data() {
    return {
      excursion: {
        "bykeId": 0,
        "pathId": 0,
        "departure": "",
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
  components: {LeafletMap, BikeSelector, PathSelector},
});
</script>