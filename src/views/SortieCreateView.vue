<template>
  <!--  Title for the page with table-->
  <div>
    <div class="container">
      <h1>nouveau Sortie</h1>
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

<!--      <div class="input-group mb-3">-->
<!--        <div class="input-group-prepend">-->
<!--          <span class="input-group-text" id="inputGroup-sizing-default">id</span>-->
<!--        </div>-->
<!--        <input type="text" id="id" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >-->
<!--      </div>-->

<!--      <div class="input-group mb-3">-->
<!--        <div class="input-group-prepend">-->
<!--          <span class="input-group-text" id="inputGroup-sizing-default">Start</span>-->
<!--        </div>-->
<!--        <input type="text" id="start" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >-->
<!--      </div>-->

      <div >
        <button type="button" class="btn btn-primary mr-2" @click="Create()">Add</button>
        <!--      <button type="button" class="btn btn-danger mr-2" @click="Delete(excursion.id)">Delete</button>-->
      </div>

    </div>
  </div>

</template>


<script>
// import {v4 as uuidv4} from 'uuid';
import ApiService from "../common/api.service";
export default {
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }

  },
  data() {
    return {
      sorties: null,
    };
  },
  methods:{
    Create(){
      const excursion = {
        "arrival": document.getElementById("arrival").value,
        "bikeId": + document.getElementById("bikeId").value,
        "departure": document.getElementById("departure").value,
        "id": 1, // changer après dans le backend
        "start": document.getElementById("start").value,
      }
      ApiService.excursions.create(excursion)
      // window.location.href = "/";
    }
  },

};
</script>