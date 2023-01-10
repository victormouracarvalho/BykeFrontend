<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Connexion</h1>
            <p class="text-xs-center" style="margin-bottom: 4px;">
              <RouterLink to="register">Vous êtes nouveau ?</RouterLink>
            </p>
          <p v-if="error" class="error-messages">{{ error }}</p>
          <form @submit.prevent="onSubmit(username, password)">
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="username"
                  placeholder="Pseudo"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="password"
                  placeholder="Mot de passe"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "BykeLoginView",
  mounted() {
    this.$store.commit("clearError")
    if (this.$store.getters.isAuthenticated) {
      this.$router.push({name: 'profile'})
    }
  },
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    onSubmit(username, password) {
      this.$store
          .dispatch('login', {username, password})
          .then(() => this.$router.push({name: "profile"}))
    },
  },
  computed: {
    ...mapState({
      error: state => state.auth.error,
    }),
  },
};
</script>
