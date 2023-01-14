<template>
  <div>
    <div class="container">
      <h1 class="display-4 fw-bold my-3">Sortie du {{ this.departureDay }}</h1>



      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Departure</span>
        </div>
        <input type="text" id="departure" class="form-control" v-model="excursion.departure">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Arrival</span>
        </div>
        <input type="text" id="arrival" class="form-control" v-model="excursion.arrival">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">BykeId</span>
        </div>
        <input type="text" id="bikeId" class="form-control" v-model="excursion.bykeId">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Trajet</span>
        </div>
        <input type="text" id="start" class="form-control" v-model="excursion.path.id">
      </div>
    </div>

    <div class="container center-align">
      <button type="button" class="btn btn-success mx-2" @click="updateItem">Modifier</button>
      <button type="button" class="btn btn-danger mx-2" @click="deleteItem">Supprimer</button>
    </div>

    <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
      <LeafletMap :steps="steps" :path="path" :initial-zoom="10"/>
    </div>
  </div>
</template>

<script>
import ApiService from "../common/api.service";
import LeafletMap from "../components/LeafletMap.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      excursion: {
        departure: "",
        arrival: "",
        start: "",
        path: {
          id: "",
        },
      },
      steps: [],
      path: [],
    };
  },
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }

    this.excursion = await ApiService.excursions.get(this.id)
    this.steps = this.excursion.path.steps.map(step => ({
      ...step,
      name: step.location,
    }))
    this.path = this.steps.map(step => step.id)
  },
  computed: {
    departureDay() {
      if (this.excursion == null) {
        return ""
      }
      return new Date(this.excursion.departure).toLocaleDateString()
    },
  },
  methods: {
    async updateItem() {
      if (!confirm("Modifier l'item ?")) {
        return;
      }
      try {
        await ApiService.excursions.update(this.id, this.excursion)
        alert("Item modifié");
      } catch(error) {
        this.$store.commit("setError", error.response.data.errors)
      }
    },
    async deleteItem(){
      if(!confirm("Supprimer l'item ?")){
        return;
      }
      try {
        await ApiService.excursions.delete(this.id)
        alert("Item supprimé");
      } catch(error) {
        this.$store.commit("setError", error.response.data.errors)
      }
    },
  },
  components: {
    LeafletMap,
  },
};
</script>