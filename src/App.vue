<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<script lang="ts">
  import { mapGetters } from "vuex";
  import bootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg?raw'
  import BootstrapFooter from "@/components/BootstrapFooter.vue";

  export default {
    name: "App",
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    data() {
      return {
        bootstrapIcons
      }
    },
    components: {
      BootstrapFooter,
    }
  }
</script>

<template>
  <RouterView />
  <BootstrapFooter name="Projet Byke" year="2023"></BootstrapFooter>
  <!-- inject bootstrap icons svg file -->
  <div v-html="bootstrapIcons" style="display: none;"></div>
</template>