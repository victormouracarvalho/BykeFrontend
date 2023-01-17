<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default">Trajet</span>
    </div>
    <button class="form-control text-start" data-bs-toggle="modal" data-bs-target="#pathSelector" :disabled="disabled">
      <template v-if="modelValue != null">
        {{ modelValue.name }}
      </template>
      <template v-else>
        Choisir un trajet
      </template>
    </button>
  </div>

  <div class="modal modal-lg fade" id="pathSelector" tabindex="-1" aria-hidden="true">
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
            <input type="text" class="form-control"
                   :value="modelValue != null ? modelValue.name : 'Aucun trajet sélectionné'" disabled>
          </div>
          <div class="container">
            <ul class="nav nav-pills nav-fill">
              <li class="nav-item">
                <a class="nav-link" :class="{active: currentTab === 1}" @click="currentTab = 1" style="cursor:pointer;">Mes
                  trajets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{active: currentTab === 2}" @click="currentTab = 2" style="cursor:pointer;">La
                  communauté</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{active: currentTab === 3}" @click="currentTab = 3" style="cursor:pointer;">Créer
                  un trajet</a>
              </li>
            </ul>
            <br>
            <div class="list-group" v-if="currentTab <= 2">
              <template v-for="path in tabPathList" v-bind:key="path.id">
                <button class="list-group-item list-group-item-action" @click="changePath(path)">
                  {{ path.name }}
                  <span v-if="currentTab === 2" class="fw-light">par {{ path.creatorName }}</span>
                </button>
              </template>
            </div>
          </div>
          <div class="container" v-if="currentTab === 3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Nom</span>
              </div>
              <input type="text" class="form-control" v-model="newPath.name">
              <button type="button" class="btn btn-primary mr-2" @click="createPath">Créer</button>
            </div>
            <div class="px-4 mx-auto my-5" style="height:600px; width:600px">
              <LeafletMap :steps="allSteps" :path="newPath.steps" :initial-zoom="10" :select-step="addOrRemoveStep"/>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Ajouter une étape</span>
              </div>
              <input type="text" class="form-control" v-model="newStep.location">
              <button type="button" class="btn btn-primary mr-2" @click="placeStep" :disabled="placingStep">Placer</button>
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
import type { FullPath, NewPath, SimplePath, Step, User } from "@/common/types";
import ApiService from "@/common/api.service";
import LeafletMap from "@/components/LeafletMap.vue";

export default defineComponent({
  name: "PathSelector",
  components: {LeafletMap},
  props: {
    modelValue: {
      type: Object as PropType<FullPath | null>,
    },
    disabled: {
      type: Boolean,
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      user: null as User | null,
      pathList: [] as SimplePath[],
      currentTab: 1,
      allSteps: null as Step[] | null,
      newPath: {
        name: '',
        creatorId: 0,
        steps: [],
      } as NewPath,
      newStep: {
        id: 0,
        location: '',
        latitude: '0',
        longitude: '0',
        creator: null,
      } as Step,
      placingStep: false,
    }
  },
  methods: {
    async changePath(path: SimplePath) {
      let newPath = await ApiService.paths.getFullPath(path.id)
      this.$emit('update:modelValue', newPath)
    },
    async createPath() {
      if (this.newPath?.name === "") {
        alert("Le nom du trajet ne peut pas être vide")
        return
      }
      if ((this.newPath?.steps?.length ?? 0) < 2) {
        alert("Le trajet doit contenir au moins 2 étapes")
        return
      }
      this.newPath.creatorId = this.user?.id ?? 0
      const newPathId = await ApiService.paths.create(this.newPath)
      await ApiService.paths.initSteps(newPathId, this.newPath)
      let newPath = await ApiService.paths.getFullPath(newPathId)
      this.pathList.push({
        id: newPathId,
        name: newPath.name,
        creatorName: newPath.creator.username,
      })
      this.currentTab = 1
      this.$emit('update:modelValue', newPath)
    },
    addOrRemoveStep(stepId: number) {
      if (this.newPath?.steps?.includes(stepId)) {
        this.newPath.steps = this.newPath.steps.filter(s => s !== stepId)
      } else {
        this.newPath.steps.push(stepId)
      }
    },
    placeStep() {
      if (this.newStep?.location === "") {
        alert("Veuillez indiquer un nom avant de placer l'étape")
        return
      }
      this.placingStep = true
    }
  },
  computed: {
    tabPathList() {
      if (this.currentTab === 1) {
        return this.pathList.filter(path => path.creatorName === this.user?.username)
      } else if (this.currentTab === 2) {
        return this.pathList
      } else {
        return []
      }
    },
  },
  async created() {
    this.user = await ApiService.auth.user()
    this.pathList = await ApiService.paths.getAll()
  },
  watch: {
    async currentTab(tab: number) {
      if (tab === 3) {
        if (this.allSteps == null) {
          this.allSteps = await ApiService.steps.getAll()
        }
      }
    }
  }
})

</script>