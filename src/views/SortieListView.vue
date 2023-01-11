<template>
  <div class="container">
    <h3 class="p-3 text-center">List des Sorties</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Date</th>
        <th>Départ</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sortie in sorties" :key="sortie.id">
        <td>{{sortie.dateSortie}}</td>
        <td>{{sortie.lieuDepart}}</td>
        <td>{{sortie.heureDepart}}</td>
        <td>{{sortie.heureArrivee}}</td>
        <td>{{sortie.distanceParcourue}}</td>
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
    this.sorties = await ApiService.sorties.getAll()
  },
  data() {
    return {
      sorties: null,
    };
  }
};
</script>