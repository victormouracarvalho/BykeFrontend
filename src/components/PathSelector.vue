<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default">Trajet</span>
    </div>
    <button class="form-control text-start" data-bs-toggle="modal" data-bs-target="#pathSelector" @click="reset"> {{ modelValue.name }}
    </button>
  </div>

  <div class="modal fade" id="pathSelector" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Test</span>
            </div>
            <input type="text" class="form-control" v-model="newPath.name">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="update">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue";
import type { Path } from "@/common/types";

export default defineComponent({
  name: "PathSelector",
  props: {
    modelValue: {
      type: Object as PropType<Path>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      newPath: clonePath(this.modelValue),
    }
  },
  methods: {
    update() {
      this.$emit('update:modelValue', this.newPath)
    },
    reset() {
      this.newPath.id = this.modelValue.id
      this.newPath.name = this.modelValue.name
    },
  },
  watch: {
    // get updates from parent
    modelValue() {
      this.reset()
    },
  }
})

function clonePath(path: Path) {
  return {
    ...path,
    steps: path.steps.map(step => ({ ...step })),
  }
}

</script>