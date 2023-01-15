<template>
  <div class="container">
    <h1>Profil</h1>

    <h3 class="p-3 text-center">Mes vélos</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Marque</th>
        <th>Cassette</th>
        <th>type</th>
        <th>Wheels</th>
        <th>Date d'achat</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="bike in bikes" :key="bike.id">
        <td>{{ bike.brand }}</td>
        <td>{{ bike.cassette }}</td>
        <td>{{ bike.type }}</td>
        <td>{{ bike.wheels }}</td>
        <td>{{ bike.purchaseDate }}</td>
      </tr>
      </tbody>
    </table>

    <RouterLink to="#" @click="$router.push({name: 'sortie-list'})">Voir mes sorties</RouterLink>
    <br>
    <RouterLink to="#" @click="logout">Déconnexion</RouterLink>
  </div>

</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import type { Bike, Profile } from "@/common/types";
import ApiService from "@/common/api.service";

export default defineComponent({
  name: "ProfileView",
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
    }
    this.profile = await ApiService.profile.get()
    this.bikes = await ApiService.bikes.getAll(this.profile.id)
  },
  data() {
    return {
      profile: null as Profile | null,
      bikes: [] as Bike[],
    };
  },
  methods: {
    logout() {
      this.$store
          .dispatch("logout")
          .then(() => this.$router.push({name: "home"}));
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
});
</script>
