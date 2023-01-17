<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<script lang="ts">
  import { mapGetters } from "vuex";
  import bootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg?raw'
  import BootstrapFooter from "@/components/BootstrapFooter.vue";
  import BootstrapNavbar from "@/components/BootstrapNavbar.vue";
  import { defineComponent } from "vue";

  export default defineComponent({
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
      BootstrapNavbar,
      BootstrapFooter,
    }
  })
</script>

<template>
  <BootstrapNavbar />
  <main>
    <RouterView />
  </main>
  <BootstrapFooter name="Projet Byke" year="2023"></BootstrapFooter>
  <!-- inject bootstrap icons svg file -->
  <div v-html="bootstrapIcons" style="display: none;"></div>
</template>