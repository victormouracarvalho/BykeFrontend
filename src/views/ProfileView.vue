<template>
  <h1>Profil</h1>
  <p v-if="isAuthenticated">Vous êtes connecté</p>
  <RouterLink to="#" @click="logout">Déconnexion</RouterLink>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "ProfileView",
  mounted() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({name: "login"})
    }
  },
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
