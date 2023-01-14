<template>
<!--  Title for the page with table-->
  <div>
    <div class="container">
      <h1>Modification des valeurs: {{$route.params.id}}</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Arrival</span>
        </div>
        <input type="text" id="arrival" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">BykeId</span>
        </div>
        <input type="text" id="bikeId" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Departure</span>
        </div>
        <input type="text" id="departure" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">id</span>
        </div>
        <input type="text" id="id" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Start</span>
        </div>
        <input type="text" id="start" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
      </div>
    </div>
    <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
      <LeafletMap :steps="[]" :path="path" :initial-zoom="10" />
    </div>
    <div class="container center-align">
      <button type="button" class="btn btn-success mr-2" @click="Update(id)">Update</button>
<!--      <button type="button" class="btn btn-danger mr-2" @click="Delete(excursion.id)">Delete</button>-->
    </div>



  </div>


</template>

<script>
import ApiService from "../common/api.service";
import { mapState } from "vuex";
import LeafletMap from "../components/LeafletMap.vue";
// document.getElementById("test2").innerHTML = $route.params.id;
export default {
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursions = await ApiService.excursions.get(this.$route.params.id)
    console.log(this.$route.params.id)
    console.log(await ApiService.excursions.get(this.$route.params.id))
    document.getElementById("arrival").value = this.excursions.arrival;
    document.getElementById("bikeId").value = this.excursions.bykeId;
    document.getElementById("departure").value = this.excursions.departure;
    document.getElementById("id").value = this.excursions.id;
    document.getElementById("start").value = this.excursions.start;

  },
  data() {
    return {
      sorties: null,
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
    Update(id){
      if(!confirm("Voulez-vous sur de modifier?")) {
        return;
      }

      this.excursions.arrival = document.getElementById("arrival").value;
      this.excursions.bikeId = document.getElementById("bikeId").value;
      this.excursions.departure = document.getElementById("departure").value;
      this.excursions.id = document.getElementById("id").value;
      this.excursions.start = document.getElementById("start").value;


      console.log(this.excursions)
      ApiService.excursions.update(id, this.excursions)
          .then(() => {
            alert("L'item est viens modifier");
          })
          .catch((error) => {
            this.$store.commit("setError", error.response.data.errors)
          })
    },
  },
  components: {
    LeafletMap,
  },
};
</script>