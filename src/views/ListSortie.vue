<template>
  <div class="container">
    <h3 class="p-3 text-center">List des Sorties</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>id</th>
        <th>DateSortie</th>
        <th>DistanceParcours</th>
        <th>HeureArrivee</th>
        <th>HeureDepart</th>
        <th>lieuDepart</th>
        <th>numUtil</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sortie in jsonObj" :key="sortie.id">
        <td>{{sortie.id}}</td>
        <td>{{sortie.dateSortie}}</td>
        <td>{{sortie.distanceParcourue}}</td>
        <td>{{sortie.heureArrivee}}</td>
        <td>{{sortie.heureDepart}}</td>
        <td>{{sortie.lieuDepart}}</td>
        <td>{{sortie.numUtil}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiService from "../common/api.service";

export default {
  async created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({name: "login"})
      return
    }
    this.jsonObj = await ApiService.sorties.getAll()
  },
  data() {
    return {
      jsonObj: null,
    };
  }
};
</script>