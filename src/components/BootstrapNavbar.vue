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
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'slides'}" @click="goToView('slides')" style="cursor: pointer" data-bs-target="#carousel" data-bs-slide="next">About</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'login'}" @click="goToView('login')" style="cursor: pointer">Login</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'register'}" @click="goToView('register')" style="cursor: pointer"><svg class="bi mx-2 mb-1" width="20" height="20"><use xlink:href="#person-circle" :fill="page === 'register' ? 'white' : '#227bfd'"></use></svg>Register</a></li>
        </ul>
      </div>
      <div v-if="authenticated===true">
        <ul class="nav nav-pills">
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'home'}" @click="goToView('home')" style="cursor: pointer">Home</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'slides'}" @click="goToView('slides')" style="cursor: pointer" data-bs-target="#carousel" data-bs-slide="next">About</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'profile'}" @click="goToView('profile')" style="cursor: pointer">Profil</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page?.startsWith('sortie')}" @click="goToView('sortie-list')" style="cursor: pointer">Sorties</a></li>
          <li class="nav-item"><a class="nav-link" :class="{active: page === 'logout'}" @click='logout' style="cursor: pointer">Logout<svg class="bi mx-2 mb-1" width="14" height="16"><use xlink:href="#box-arrow-right" fill="#227bfd"></use></svg></a></li>
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
    page(): string {
      if (this.$route.name == null) {
        return ""
      }
      return this.$route.name.toString()
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