<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default">Trajet</span>
    </div>
    <button class="form-control text-start" data-bs-toggle="modal" data-bs-target="#pathSelector" :disabled="disabled">
      <template v-if="modelValue != null">
        {{ modelValue.name}}
      </template>
      <template v-else>
        Choisir un trajet
      </template>
    </button>
  </div>

  <div class="modal fade" id="pathSelector" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Choisir un trajet</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Trajet actuel</span>
            </div>
            <input type="text" class="form-control" :value="modelValue != null ? modelValue.name : 'Aucun trajet sélectionné'" disabled>
          </div>
          <div class="container">
            <ul class="nav nav-pills nav-fill">
              <li class="nav-item">
                <a class="nav-link" :class="{active: currentTab === 1}" @click="currentTab = 1" style="cursor:pointer;">Mes trajets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{active: currentTab === 2}" @click="currentTab = 2" style="cursor:pointer;">Tous les trajets</a>
              </li>
            </ul>
            <br>
            <div class="list-group">
              <template v-for="path in pathList" v-bind:key="path.id">
                <button class="list-group-item list-group-item-action" @click="changePath(path)">
                  {{path.name}}
                  <span v-if="currentTab === 2" class="fw-light">par {{path.creatorName}}</span>
                </button>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue";
import type { FullPath, SimplePath } from "@/common/types";
import ApiService from "@/common/api.service";

export default defineComponent({
  name: "PathSelector",
  props: {
    modelValue: {
      type: Object as PropType<FullPath | null>,
      required: true,
    },
    disabled: {
      type: Boolean,
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      pathList: [] as SimplePath[],
      currentTab: 1,
    }
  },
  methods: {
    async changePath(path: SimplePath) {
      let newPath = await ApiService.paths.getFullPath(path.id)
      this.$emit('update:modelValue', newPath)
    }
  },
  watch: {
    async currentTab() {
      this.pathList = []
      switch (this.currentTab) {
        case 1:
          this.pathList = await ApiService.paths.getMine()
          break;
        case 2:
          this.pathList = await ApiService.paths.getAll()
          break;
      }
    },
  },
  async created() {
    this.pathList = await ApiService.paths.getMine()
  },
})

</script>