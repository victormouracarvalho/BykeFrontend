<template>
  <div>
    <div class="container">
      <h1 class="display-4 fw-bold my-3">Sortie du {{ departureDay }}</h1>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Trajet</span>
        </div>
        <input type="text" id="start" class="form-control" v-model="excursion.path.name" :disabled="ended">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Departure</span>
        </div>
        <input type="text" id="departure" class="form-control" v-model="excursion.departure" :disabled="ended">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Arrival</span>
        </div>
        <input type="text" id="arrival" class="form-control" v-model="arrivalOrMessage" disabled>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">BykeId</span>
        </div>
        <input type="text" id="bikeId" class="form-control" v-model="excursion.bykeId" :disabled="ended">
      </div>
    </div>

    <div class="container center-align">
      <button type="button" class="btn btn-success mx-2" @click="updateItem" v-if="ended === false">Modifier</button>
      <button type="button" class="btn btn-danger mx-2" @click="deleteItem">Supprimer</button>
    </div>

    <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
      <LeafletMap :steps="steps" :path="path" :initial-zoom="10"/>
    </div>
  </div>
</template>

<script lang="ts">
import ApiService from "../common/api.service";
import LeafletMap from "../components/LeafletMap.vue";
import { defineComponent } from "vue";
import type { ExcursionFull, Step } from "@/common/types";

export default defineComponent({
  data() {
    return {
      id: +this.$route.params.id,
      excursion: {
        id: 0,
        bykeId: 0,
        start: "",
        departure: "",
        arrival: "",
        path: {
          id: 0,
          name: "",
          creator: {
            id: 0,
            name: "",
          },
          steps: [],
        },
      } as ExcursionFull,
      steps: [] as Step[],
      path: [] as number[],
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
      if (this.excursion.departure === "") {
        return ""
      }
      return new Date(this.excursion.departure).toLocaleDateString()
    },
    ended() {
      return this.excursion.arrival != null
    },
    arrivalOrMessage() {
      if (this.excursion.arrival == null) {
        return "En cours"
      } else {
        return this.excursion.arrival
      }
    }
  },
  methods: {
    async updateItem() {
      if (!confirm("Modifier l'item ?")) {
        return;
      }
      await ApiService.excursions.update(this.id, {
        bykeId: this.excursion.bykeId,
        pathId: this.excursion.path.id,
        departure: this.excursion.departure,
      })
      alert("Item modifié");
    },
    async deleteItem() {
      if (!confirm("Supprimer l'item ?")) {
        return;
      }
      await ApiService.excursions.delete(this.id)
      alert("Item supprimé");
    },
  },
  components: {
    LeafletMap,
  },
});
</script>