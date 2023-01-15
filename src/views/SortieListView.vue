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
          <button type="button" class="btn btn-success mr-2" id="goToView" @click="GoToView(excursion.id)">Update</button>
        </td>
        <td>
          <button type="button" class="btn btn-danger mr-1" @click="Delete(excursion.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-primary mr-2" id="goToCreate" @click="GoToCreate()">Create Sortie</button>
    </div>
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

    // document.getElementById("goToView").addEventListener("click", function () {
    //   window.location.href = "/sortieView/" + this.excursion.id;
    // })
  },
  data() {
    return {
      excursions: [],
    };
  },
  methods:{
    Delete(id){
      if(!confirm("Are you sure?")) {
        return;
      }
      ApiService.excursions.delete(id)
          .then(() => {
            alert("L'item est viens supprimé");
          })
          .catch((error) => {
            this.$store.commit("setError", error.response.data.errors)
          })
    },
    GoToView(id){
      window.location.href = "/sortiesView/" + id;
    },
    GoToCreate(){
      window.location.href = "/sortiesCreate";
    }
  }
};
</script>