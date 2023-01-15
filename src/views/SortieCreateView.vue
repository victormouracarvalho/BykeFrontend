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

      <em>Sélecteur de trajet à rajouter</em>

      <div >
        <button type="button" class="btn btn-primary mr-2" @click="create">Add</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import ApiService from "../common/api.service";
import { defineComponent } from "vue";
import type { ExcursionPayload } from "@/common/types";

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
    };
  },
  methods:{
    async create(){
      await ApiService.excursions.create(this.excursion)
      this.$router.push({name: "sortie-list"})
    }
  },
});
</script>