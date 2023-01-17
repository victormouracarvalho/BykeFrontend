<template>
  <div class="container">
    <h1 class="display-4 fw-bold my-3">Sortie du {{ departureDay }}</h1>

    <PathSelector v-model="excursion.path" :disabled="ended"></PathSelector>
    <DatetimeInput name="Départ" v-model="excursion.departure" :disabled="ended" />
    <DatetimeInput name="Arrivée" v-model="excursion.arrival" disabled nullMessage="En cours" />
    <BikeSelector v-model="excursion.bikeId" :disabled="ended"></BikeSelector>
  </div>

  <div class="container center-align">
    <button type="button" class="btn btn-success me-3" @click="updateItem" v-if="ended === false"><svg class="bi mx-0" width="16" height="16"><use xlink:href="#arrow-clockwise" fill="white"></use></svg> Modifier</button>
    <button type="button" class="btn btn-primary me-3" @click="endItem" v-if="ended === false">Terminer</button>
    <button type="button" class="btn btn-danger" @click="deleteItem">Supprimer</button>
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
        bikeId: 0,
        start: "",
        departure: new Date(),
        arrival: new Date(),
        path: {
          id: 0,
          name: "",
          creator: {
            id: 0,
            username: "",
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
  },
  computed: {
    departureDay() {
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
        userId: 0,
        bikeId: this.excursion.bikeId,
        pathId: this.excursion.path.id,
        departure: this.excursion.departure,
      })
    },
    async deleteItem() {
      if (!confirm("Supprimer l'item ?")) {
        return;
      }
      await ApiService.excursions.delete(this.id)
      this.$router.push({name: "sortie-list"})
    },
    async endItem() {
      if (!confirm("Terminer l'excursion ? Vous ne pourrez plus la modifier.")) {
        return;
      }
      await ApiService.excursions.end(this.id, {
        userId: 0,
        bikeId: this.excursion.bikeId,
        pathId: this.excursion.path.id,
        departure: this.excursion.departure,
      })
      this.excursion = await ApiService.excursions.get(this.id)
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