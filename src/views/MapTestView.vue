<template>
  <div class="px-4 mx-auto my-5" style="height:600px; width:800px">
    <LeafletMap :steps="steps" :initial-zoom="10" :path="path"/>
  </div>
</template>

<script>
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  components: {
    LeafletMap,
  },
  data() {
    return {
      steps: [
        {
          id: 1,
          name: "RONTALON",
          latitude: 45.66052627560000,
          longitude: 4.63221406937000,
        },
        {
          id: 2,
          name: "SAINT ANDRE LA COTE",
          latitude: 45.63100000000000,
          longitude: 4.60100000000000,
        },
        {
          id: 3,
          name: "SAINT MARTIN EN HAUT",
          latitude: 45.66000000000000,
          longitude: 4.55900000000000,
        },
      ],
      path: [1, 2, 3],
    }
  }
};
</script>

<style></style>