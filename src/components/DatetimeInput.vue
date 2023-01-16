<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">{{ name }}</span>
    </div>
    <template></template>
    <input :type="modelValue != null ? 'datetime-local' : 'text'" class="form-control" :value="dateString" @change="event => update(event.target.value)" :disabled="disabled">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Bike } from "@/common/types";
import ApiService from "@/common/api.service";

export default defineComponent({
  name: 'DatetimeInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Date,
    },
    disabled: {
      type: Boolean,
    },
    nullMessage: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    update(inputValue: string) {
      let date = new Date(inputValue)
      this.$emit('update:modelValue', date)
    },
  },
  computed: {
    dateString() {
      if (this.modelValue == null) {
        if (this.nullMessage != null) {
          return this.nullMessage
        }
        return "No date"
      }
      return this.modelValue.toISOString().split('.')[0]
    }
  },
})
</script>