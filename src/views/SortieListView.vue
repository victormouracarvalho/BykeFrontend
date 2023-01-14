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
        <th></th>
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
        <td>
          <button type="button" class="btn btn-success mr-2" id="goToView" @click="goToView(excursion.id)">Update</button>
        </td>
        <td>
          <button type="button" class="btn btn-danger mr-1" @click="delete(excursion.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiService from "../common/api.service";

export default {
  data() {
    return {
      excursions: [],
    }
  },
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursions = await ApiService.excursions.getAll()
  },
  methods:{
    async delete(id){
      if(!confirm("Are you sure?")) {
        return;
      }
      try {
        await ApiService.excursions.delete(id)
        alert("L'item est viens supprimé");
      } catch(error) {
        this.$store.commit("setError", error.response.data.errors)
      }
    },
    goToView(id){
      this.$router.push({name: "sortie-view", params: {id: id}})
    }
  }
};
</script>