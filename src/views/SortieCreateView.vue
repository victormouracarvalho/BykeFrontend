<template>
  <div>
    <div class="container">
      <h1>Nouvelle sortie</h1>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Vélo</span>
        </div>
        <input type="text" id="bikeId" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="excursion.bykeId">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Date de départ</span>
        </div>
        <input type="text" id="departure" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="excursion.departure">
      </div>

      <PathSelector v-model="path"></PathSelector>

      <div >
        <button type="button" class="btn btn-primary mr-2" @click="create">Add</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import ApiService from "../common/api.service";
import { defineComponent } from "vue";
import type { ExcursionPayload, FullPath } from "@/common/types";
import PathSelector from "@/components/PathSelector.vue";

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
  components: {PathSelector},
});
</script>