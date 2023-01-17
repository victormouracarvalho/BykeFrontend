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
        <tr v-if="displayInput">
          <td><input type="text" class="form-control" v-model="bike.brand"></td>
          <td><input type="text" class="form-control" v-model="bike.wheels"></td>
          <td><input type="text" class="form-control" v-model="bike.cassette"></td>
          <td><datetime-input name="Achat" no-prepend v-model="bike.purchaseDate"></datetime-input></td>
        </tr>
        </tbody>
      </table>
      <div>
        <button type="button" class="btn btn-primary" @click="addRow" v-if="displayInput === false">Ajouter un vélo</button>
        <button type="button" class="btn btn-success me-2" @click="saveRow" v-if="displayInput === true">Enregistrer</button>
        <button type="button" class="btn btn-danger" @click="displayInput = false" v-if="displayInput === true">Annuler</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { User } from "@/common/types";
import ApiService from "@/common/api.service";
import DatetimeInput from "@/components/DatetimeInput.vue";

export default defineComponent({
  name: "ProfileView",
  components: {DatetimeInput},
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
    }
    this.user = await ApiService.auth.user()
  },
  data() {
    return {
      user: null as User | null,
      bike: {
        id: 0,
        brand: "",
        wheels: "",
        cassette: "",
        purchaseDate: new Date(),
      },
      displayInput: false,
    }
  },
  methods: {
    logout() {
      this.$store
          .dispatch("logout")
          .then(() => this.$router.push({name: "home"}));
    },
    addRow() {
      this.displayInput = true
    },
    async saveRow() {
      await ApiService.bikes.add(this.user?.id || 0, this.bike)
      this.displayInput = false
    },
  },
});
</script>
