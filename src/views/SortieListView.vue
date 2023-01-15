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
          <button type="button" class="btn btn-danger mr-1" @click="deleteItem(excursion.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-primary mr-2" id="goToCreate" @click="$router.push({name: 'sortie-create'})">Create Sortie</button>
    </div>
  </div>
</template>

<script lang="ts">
import ApiService from "../common/api.service";
import type { Excursion } from "@/common/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      excursions: [] as Excursion[],
    };
  },
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursions = await ApiService.excursions.getAll()
  },
  methods:{
    async deleteItem(id: number){
      if(!confirm("Are you sure?")) {
        return;
      }
      await ApiService.excursions.delete(id)
      alert("L'item est viens supprimé");
    },
    goToView(id: number){
      this.$router.push({name: "sortie-view", params: {id: id}})
    }
  }
});
</script>