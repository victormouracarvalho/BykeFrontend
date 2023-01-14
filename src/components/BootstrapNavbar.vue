<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi mx-1" width="40" height="32"><use xlink:href="#bicycle"></use></svg>
        <span class="fs-4">Projet Byke</span>
      </a>

      <div v-if="authenticated===false">
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="#" class="nav-link active" @click='GoToView("")' aria-current="page">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click='GoToView("sorties")'>List Sorties</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click='GoToView("profile")'>Profile</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
        </ul>
      </div>
      <div v-if="authenticated===true">
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="#" class="nav-link active" @click='GoToView("")' aria-current="page">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click='GoToView("sorties")'>List Sorties</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click='GoToView("profile")'>Profile</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click='logout()'>Logout</a></li>
        </ul>
      </div>

    </header>
  </div>
</template>


<script>

export default {
  async created() {
    if (this.$store.getters.isAuthenticated === false) {
      this.$router.push({name: "login"})
      return
    }
  },
   data() {
      return {
        sorties: null
      }
    },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    GoToView(path){
      window.location.href = "/" + path;
    },
    logout() {
      if(!confirm("Are you sure to Logout?")) {
        return;
      }
      this.$store
          .dispatch("logout")
          .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>