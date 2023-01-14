<script lang="ts">
import BootstrapHero from "@/components/BootstrapHero.vue";
import BootstrapFeatures from "@/components/BootstrapFeatures.vue";
export default {
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
}
</script>

<template>
  <main>
    <BootstrapHero img="/assets/geojango-maps-Z8UgB80_46w-unsplash.jpg" :authenticated="isAuthenticated"></BootstrapHero>
    <BootstrapFeatures></BootstrapFeatures>
  </main>
</template>
