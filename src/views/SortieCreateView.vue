<template>
  <div>
    <div class="container">
      <h1>Nouvelle sortie</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Arrival</span>
        </div>
        <input type="text" id="arrival" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="excursion.arrival" >
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">BykeId</span>
        </div>
        <input type="text" id="bikeId" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="excursion.bykeId">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Departure</span>
        </div>
        <input type="text" id="departure" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="excursion.departure">
      </div>

      <div >
        <button type="button" class="btn btn-primary mr-2" @click="create">Add</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import ApiService from "../common/api.service";
import { defineComponent } from "vue";

export default defineComponent({
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
    }
  },
  data() {
    return {
      excursion: {
        "id": 0,
        "bykeId": 0,
        "departure": "",
        "arrival": "",
        "start": "",
      }
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