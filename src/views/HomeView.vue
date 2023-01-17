<script lang="ts">
import BootstrapHero from "@/components/BootstrapHero.vue";
import BootstrapFeatures from "@/components/BootstrapFeatures.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    BootstrapFeatures,
    BootstrapHero,
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$store.getters.isAuthenticated
    },
  },
})
</script>

<template>
  <BootstrapHero img="/assets/geojango-maps-Z8UgB80_46w-unsplash.jpg" :authenticated="isAuthenticated"></BootstrapHero>
  <BootstrapFeatures></BootstrapFeatures>
</template>
