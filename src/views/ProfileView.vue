<template>
  <h1>Profile</h1>
  <p v-if="isAuthenticated">Vous êtes connecté</p>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "ProfileView",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>
