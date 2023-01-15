<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi mx-1" width="40" height="32">
          <use xlink:href="#bicycle"></use>
        </svg>
        <span class="fs-4">Projet Byke</span>
      </a>

      <div v-if="authenticated===false">
        <ul class="nav nav-pills">
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'home'}" @click="goToView('home')" style="cursor: pointer">Home</a></li>
          <li class="nav-item"><a class="nav-link" style="cursor: pointer">About</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'login'}" @click="goToView('login')" style="cursor: pointer">Login</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'register'}" @click="goToView('register')" style="cursor: pointer">Register</a></li>
        </ul>
      </div>
      <div v-if="authenticated===true">
        <ul class="nav nav-pills">
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'home'}" @click="goToView('home')" style="cursor: pointer">Home</a></li>
          <li class="nav-item"><a class="nav-link" style="cursor: pointer">About</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'profile'}" @click="goToView('profile')" style="cursor: pointer">Profil</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'sortie-list'}" @click="goToView('sortie-list')" style="cursor: pointer">Sorties</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'logout'}" @click='logout' style="cursor: pointer">Logout</a></li>
        </ul>
      </div>
    </header>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    authenticated(): boolean {
      return this.$store.getters.isAuthenticated
    },
    page() {
      return this.$route.name
    }
  },
  methods: {
    goToView(name: string) {
      this.$router.push({name})
    },
    logout() {
      if (!confirm("Se déconnecter ?")) {
        return;
      }
      this.$store
          .dispatch("logout")
          .then(() => this.$router.push({name: "home"}));
    }
  }
});
</script>