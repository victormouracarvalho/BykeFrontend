<template>
  <div class="container">
    <h1>Profil</h1>

    <h3 class="p-3 text-center">Mes vélos</h3>
    <template v-if="user != null">
      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Marque</th>
          <th>Roues</th>
          <th>Cassette</th>
          <th>Date d'achat</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="bike in user.purchases" :key="bike.id">
          <td>{{ bike.brand }}</td>
          <td>{{ bike.wheels }}</td>
          <td>{{ bike.cassette }}</td>
          <td>{{ bike.purchaseDate.toLocaleDateString() }}</td>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { User } from "@/common/types";
import ApiService from "@/common/api.service";

export default defineComponent({
  name: "ProfileView",
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
    }
    this.user = await ApiService.auth.user()
  },
  data() {
    return {
      user: null as User | null
    }
  },
  methods: {
    logout() {
      this.$store
          .dispatch("logout")
          .then(() => this.$router.push({name: "home"}));
    },
  },
});
</script>
