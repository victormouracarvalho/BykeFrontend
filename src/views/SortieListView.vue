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
        <td>{{}}</td>
        <td>{{sortie.start}}</td>
        <td>{{sortie.departure}}</td>
        <td>{{sortie.arrival}}</td>
        <td>{{}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiService from "../common/api.service";

export default {
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
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