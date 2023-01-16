<template>
  <div class="container">
    <h3 class="p-3 text-center">Mes sorties</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Trajet</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="excursion in excursions" :key="excursion.id">
        <td>{{ excursion.pathName }}</td>
        <td>{{ departurePretty[excursion.id] }}</td>
        <td>{{ arrivalPretty[excursion.id] }}</td>
        <td> TODO</td>
        <td>
          <button type="button" class="btn btn-success mr-2" id="goToView" @click="goToView(excursion.id)">{{ excursion.arrival != null ? 'Voir' : 'Modifier'}}</button>

        </td>
        <td>
          <button type="button" class="btn btn-danger mr-1" @click="deleteItem(excursion.id)"><svg class="bi mx-0" width="16" height="16"><use xlink:href="#trash3" fill="white"></use></svg></button>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-primary mr-2" id="goToCreate" @click="$router.push({name: 'sortie-create'})">
        <svg class="bi mb-1 me-1" width="20" height="20"><use xlink:href="#plus-square" fill="white"></use></svg>
        Nouvelle sortie
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import ApiService from "../common/api.service";
import type { ExcursionSimple } from "@/common/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      excursions: [] as ExcursionSimple[],
    };
  },
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursions = await ApiService.excursions.getAll()
  },
  methods: {
    async deleteItem(id: number) {
      if (!confirm("Are you sure?")) {
        return;
      }
      await ApiService.excursions.delete(id)
      alert("L'item est viens supprimé");
    },
    goToView(id: number) {
      this.$router.push({name: "sortie-view", params: {id: id}})
    }
  },
  computed: {
    departurePretty() {
      let dict = {} as { [key: number]: string }
      for (let excursion of this.excursions) {
        dict[excursion.id] = new Date(excursion.departure).toLocaleString()
      }
      return dict
    },
    arrivalPretty() {
      let dict = {} as { [key: number]: string }
      for (let excursion of this.excursions) {
        if (excursion.arrival == null) {
          dict[excursion.id] = "En cours"
        } else {
          dict[excursion.id] = new Date(excursion.arrival).toLocaleString()
        }
      }
      return dict
    }
  }
});
</script>