<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Créer un compte</h1>
            <p class="text-xs-center" style="margin-bottom: 4px;">
              <RouterLink to="login">Vous avez déjà un compte ?</RouterLink>
            </p>
          <p v-if="error" class="error-messages">{{ error }}</p>
          <form @submit.prevent="onSubmit">
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
              Créer un compte
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BykeRegisterView",
  created() {
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
    onSubmit() {
      this.$store
          .dispatch('register', {
            username: this.username,
            password: this.password,
          })
          .then(() => this.$router.push({name: "login"}))
    },
  },
  computed: {
    error() {
      return this.$store.state.auth.error
    }
  },
});
</script>
