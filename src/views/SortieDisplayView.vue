<template>
<!--  Title for the page with table-->
  <div>
    <h2>Sortie Display and Modify: {{$route.params.id}}</h2>
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
      <tr v-for="excursion in excursions" :key="excursion.id">
        <th>{{ excursion.id }}</th>
        <th>??</th>
        <th>{{ excursion.start }}</th>
        <th>{{ excursion.departure }}</th>
        <th>{{ excursion.arrival }}</th>
        <th> TODO</th>

      </tr>
      </thead>
      <tbody>
      </tbody>
    </table>

    <div class="container">
      <h1>test</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
        </div>
        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value="{{$excursion.arrival}}">
      </div>
    </div>

    <button type="button" class="btn btn-success mr-1">Update</button>


  </div>


</template>

<script>
import ApiService from "../common/api.service";
import { mapState } from "vuex";
export default {
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursions = await ApiService.excursions.get(this.$route.params.id)
    console.log(this.$route.params.id)
    console.log(await ApiService.excursions.get(this.$route.params.id))
  },
  data() {
    return {
      sorties: null,
    };
  },
  methods:{
    // Delete(id){
    //   if(!confirm("Are you sure?")) {
    //     return;
    //   }
    //   ApiService.excursions.delete(id)
    //       .then(() => {
    //         alert("L'item est viens supprimé");
    //       })
    //       .catch((error) => {
    //         this.$store.commit("setError", error.response.data.errors)
    //       })
    // }


  }
};
</script>