<!--From https://getbootstrap.com/docs/5.2/examples/-->

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BootstrapHero",
  props: ['img', 'authenticated'],
  methods: {
    go(name: string) {
      this.$router.push({name});
    }
  },
})
</script>

<template>
  <div class="px-4 pt-5 my-5 text-center border-bottom">
    <h1 class="display-4 fw-bold">Suivez vos trajets</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Le site de référence pour enregistrer vos sorties à vélo et partager vos meilleur trajets
        avec la communauté.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5" v-if="authenticated === false">
        <a type="button" class="btn btn-primary btn-lg px-4 me-sm-3" @click="go('register')">Créer un compte</a>
        <a type="button" class="btn btn-outline-secondary btn-lg px-4" @click="go('login')">Connexion<svg class="bi mx-1" width="20" height="16"><use xlink:href="#box-arrow-right"></use></svg></a>
      </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5" v-if="authenticated">
        <a type="button" class="btn btn-primary btn-lg px-4 me-sm-3" @click="go('profile')">Accéder à mon profil</a>
      </div>
    </div>
    <div class="overflow-hidden" style="max-height: 30vh;">
      <div class="container px-5">
        <img :src="img" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" loading="lazy" width="700"
             height="500">
      </div>
    </div>
  </div>
</template>