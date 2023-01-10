<template>
  <h1>Profile</h1>
  <p v-if="isAuthenticated">Vous êtes connecté</p>
  <RouterLink to="#" @click="logout">Déconnexion</RouterLink>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "ProfileView",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store
          .dispatch("logout")
          .then(() => this.$router.push({ name: "home" }));
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>
