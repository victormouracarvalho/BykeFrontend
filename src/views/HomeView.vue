<script lang="ts">
import BootstrapHero from "@/components/BootstrapHero.vue";
import BootstrapFeatures from "@/components/BootstrapFeatures.vue";
export default {
  name: "HomeView",
  components: {
    BootstrapFeatures,
    BootstrapHero,
  },
}
</script>

<template>
  <main>
    <BootstrapHero img="/assets/geojango-maps-Z8UgB80_46w-unsplash.jpg"></BootstrapHero>
    <BootstrapFeatures></BootstrapFeatures>
  </main>
</template>
