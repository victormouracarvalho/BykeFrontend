<template>
  <div class="container">
    <h3 class="p-3 text-center">List des Sorties</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Départ</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="excursion in excursions" :key="excursion.id">
        <td>{{ excursion.id }}</td>
        <td>??</td>
        <td>{{ excursion.start }}</td>
        <td>{{ excursion.departure }}</td>
        <td>{{ excursion.arrival }}</td>
        <td> TODO</td>
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
    this.excursions = await ApiService.excursions.getAll()
  },
  data() {
    return {
      sorties: null,
    };
  }
};
</script>