<template>
  <div class="container">
    <h1 class="display-4 fw-bold my-3">Sortie du {{ departureDay }}</h1>

    <PathSelector v-model="excursion.path" :disabled="ended"></PathSelector>
    <DatetimeInput name="Départ" v-model="excursion.departure" :disabled="ended" />
    <DatetimeInput name="Arrivée" v-model="excursion.arrival" disabled nullMessage="En cours" />
    <BikeSelector v-model="excursion.bykeId" :disabled="ended"></BikeSelector>
  </div>

  <div class="container center-align">
    <button type="button" class="btn btn-success" @click="updateItem" v-if="ended === false">Modifier</button>
    <button type="button" class="btn btn-danger" :class="{'mx-3': ended == false}" @click="deleteItem">Supprimer</button>
  </div>

  <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
    <LeafletMap :steps="excursion.path.steps" :path="mapPath" :initial-zoom="10"/>
  </div>
</template>

<script lang="ts">
import ApiService from "../common/api.service";
import LeafletMap from "../components/LeafletMap.vue";
import { defineComponent } from "vue";
import type { ExcursionFull } from "@/common/types";
import PathSelector from "@/components/PathSelector.vue";
import BikeSelector from "@/components/BikeSelector.vue";
import DatetimeInput from "@/components/DatetimeInput.vue";

export default defineComponent({
  data() {
    return {
      id: +this.$route.params.id,
      excursion: {
        id: 0,
        bykeId: 0,
        start: "",
        departure: new Date(),
        arrival: new Date(),
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
    };
  },
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
    this.excursion = await ApiService.excursions.get(this.id)
    console.log(this.excursion.departure.toISOString())
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
    mapPath() {
      return this.excursion.path.steps.map(step => step.id)
    },
  },
  methods: {
    async updateItem() {
      await ApiService.excursions.update(this.id, {
        bykeId: this.excursion.bykeId,
        pathId: this.excursion.path.id,
        departure: this.excursion.departure,
      })
      this.$router.push({name: "sortie-list"})
    },
    async deleteItem() {
      if (!confirm("Supprimer l'item ?")) {
        return;
      }
      await ApiService.excursions.delete(this.id)
      this.$router.push({name: "sortie-list"})
    },
  },
  components: {
    BikeSelector,
    LeafletMap,
    PathSelector,
    DatetimeInput,
  },
});
</script>