<template>
  <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
    <LeafletMap :steps="steps" :initial-zoom="10" :path="path"/>
  </div>
</template>

<script lang="ts">
import LeafletMap from "@/components/LeafletMap.vue";
import { defineComponent } from "vue";
import type { Step } from "@/common/types";

export default defineComponent({
  components: {
    LeafletMap,
  },
  data() {
    return {
      steps: [
        {
          id: 1,
          location: "RONTALON",
          latitude: "45.66052627560000",
          longitude: "4.63221406937000",
        },
        {
          id: 2,
          location: "SAINT ANDRE LA COTE",
          latitude: "45.63100000000000",
          longitude: "4.60100000000000",
        },
        {
          id: 3,
          location: "SAINT MARTIN EN HAUT",
          latitude: "45.66000000000000",
          longitude: "4.55900000000000",
        },
      ] as Step[],
      path: [1, 2, 3] as number[],
    }
  }
});
</script>

<style></style>