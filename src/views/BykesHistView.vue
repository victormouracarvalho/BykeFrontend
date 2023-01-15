<template>
  <div class="container">
    <h3 class="p-3 text-center">Affichage: Vélos par utilisateur</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>ID</th>
        <th>Utilisateur</th>
        <th>Date d'achet</th>
        <th>Marque</th>
        <th>Cassette</th>
        <th>type</th>
        <th>Wheels</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="byke in bikes" :key="byke.id">
        <td>{{ byke.id }}</td>
        <td>{{ byke.owner.name }}</td>
        <td>{{ byke.purchaseDate }}</td>
        <td>{{ byke.brand }}</td>
        <td>{{ byke.cassette }}</td>
        <td>{{ byke.type }}</td>
        <td>{{ byke.wheels }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>


<script lang="ts">
import ApiService from "../common/api.service";
import type { Bike } from "@/common/types";
import { defineComponent } from "vue";



export default defineComponent({
  data() {
    return {
      bikes: [] as Bike[],
    };
  },
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    console.log(+ this.$route.params.id)
    this.bikes = await ApiService.bikes.getAll(+ this.$route.params.id)
    console.log(this.bikes)
  },
  methods:{

  }
});
</script>