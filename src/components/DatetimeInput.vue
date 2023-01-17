<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">{{ name }}</span>
    </div>
    <input :type="modelValue != null ? 'datetime-local' : 'text'" class="form-control" :value="dateString"
           @change="update" :disabled="disabled">
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'DatetimeInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object as PropType<Date | null>,
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
    update(event: Event) {
      let inputValue = (event.target as HTMLInputElement).value;
      if (inputValue === '') {
        return
      }
      this.$emit('update:modelValue', new Date(inputValue + 'Z'))
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