<template>
  <h1>Регистрация</h1>
  <input
      v-model="login"
      class="display-block"
      type="text"
      placeholder="Логин"
  >
  <input
      v-model="password"
      class="display-block"
      type="password"
      placeholder="Пароль"
  >
  <button
      class="display-block"
      @click="registrateUser"
  >
    Регистрация
  </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegistrationPage',
  data () {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      registration: 'user/registration',
    }),
    async registrateUser () {
      await this.registration({
        login: this.login,
        password: this.password,
      });
      this.$router.push({ name: 'Main' });
    }
  }
};
</script>

<style scoped>
.display-block {
  display: block;
}
</style>