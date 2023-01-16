<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default">Vélo</span>
    </div>
    <select class="form-select" :value="modelValue" @change="update" :disabled="disabled">
      <option value="0">Choisir un vélo</option>
      <template v-for="bike in bikeList" v-bind:key="bike.id">
        <option v-bind:value="bike.id">{{ bike.brand }}</option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Bike } from "@/common/types";
import ApiService from "@/common/api.service";

export default defineComponent({
  name: 'BikeSelector',
  props: {
    modelValue: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      bikeList: [] as Bike[],
    }
  },
  methods: {
    update(event: Event) {
      let bikeId = +(event.target as HTMLSelectElement).value;
      this.$emit('update:modelValue', bikeId)
    },
  },
  async created() {
    let profile = await ApiService.profile.get()
    this.bikeList = await ApiService.bikes.getAll(profile.id)
  },
})
</script>