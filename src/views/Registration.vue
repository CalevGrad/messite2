<template>
  <div class="authorization" v-on:keyup.enter="registration">
    <div class="auth-text">Регистрация</div>
    <div style="text-align: center;" class="red">
      {{ errorRegistration }}
    </div>
    <form @submit.prevent="registration">
      <input type="login" id="username" class="auth-input" placeholder="Имя пользователя"
             v-model="form.username"
      >
      <input type="password" id="password" class="auth-input" placeholder="Пароль"
             v-model="form.password"
      >
      <div class="auth-buttons">
        <button id="button-enter" class="auth-button" type="submit">Регистрация</button>
        <router-link to="/login" id="button-registration" class="auth-button">К авторизации</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Auth from '@/api/auth'
export default {
  name: "Registration",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errorRegistration: '',
    }
  },
  methods: {
    async registration() {
      this.errorRegistration = ''
      try {
        await Auth.signUp(this.form.username, this.form.password)
      } catch (error) {
        if (!error.response) {
          console.error(error)
        } else {
          if (error.response.data.username)
            this.errorRegistration = error.response.data.username[0]
          if (error.response.data.password)
            this.errorRegistration = error.response.data.password[0]
        }
        return
      }
      try {
        await this.$store.dispatch('auth/signIn', this.form)
        await this.$router.push('/')
      } catch {
        await this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.red {
  color: red;
}
</style>