<template>
  <h1>Авторизация</h1>
  <div
      v-if="error"
      style="color: red"
  >
    {{ error }}
  </div>

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
      @click="authUser"
  >
    Авторизация
  </button>
  <router-link
      :to="{
        name:'Registration'
      }"
  >
    Регистрация
  </router-link>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',
  data () {
    return {
      login: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions({
      auth: 'user/login',
    }),
    async authUser () {
      try {
        await this.auth({
          login: this.login,
          password: this.password,
        });
        this.$router.push({ name: 'Main' });
      } catch (e) {
        if (e.response.status === 401) {
          this.error = 'Не верный логин или пароль';
        } else {
          this.error = 'Ошибка';
        }
      }
    }
  }
};
</script>

<style scoped>
.display-block {
  display: block;
}
</style>