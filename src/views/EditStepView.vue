<template>
  <div>

  </div>
</template>


<script>

import ApiService from "../common/api.service";
import { mapState } from "vuex";
// document.getElementById("test2").innerHTML = $route.params.id;
export default {
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursions = await ApiService.excursions.get(this.$route.params.id)

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
  }
};
</script>