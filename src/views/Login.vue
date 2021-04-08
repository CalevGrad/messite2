<template>
  <div class="authorization" v-on:keyup.enter="signIn">
    <div class="auth-text">АВТОРИЗАЦИЯ</div>
    <div style="text-align: center;" class="red">
      {{ errorAuthorization }}
    </div>
    <form @submit.prevent="signIn">
      <input type="login" id="username" class="auth-input" placeholder="Имя пользователя"
             v-model="form.username"
      >
      <input type="password" id="password" class="auth-input" placeholder="Пароль"
             v-model="form.password"
      >
      <div class="auth-buttons">
        <button id="button-enter" class="auth-button" type="submit">Войти</button>
        <router-link to="/registration" id="button-registration" class="auth-button">Регистрация</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errorAuthorization: '',
    }
  },

  methods: {
    async signIn() {
      this.errorAuthorization = ''
      try {
        await this.$store.dispatch('auth/signIn', this.form)
        await this.$router.push('/')
      } catch (error) {
        this.errorAuthorization = 'Ошибка авторизации!'
        if (!error.response) {
          console.error(error)
          return
        }
        if (error.response.status === 403) {
          this.errorAuthorization = 'Неверный email или пароль'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.red {
  color: red;
}

.green {
  color: green;
}
</style>