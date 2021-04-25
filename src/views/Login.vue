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
        <router-link to="/registration" id="button-authorization" class="auth-button">Регистрация</router-link>
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

.authorization {
  margin-top: 150px;
  padding: 5px;
  width: 300px;
  min-height: 220px;
  background: white;
  border-radius: 5px;
}

.auth-text {
  font-size: 20px;
  text-align: center;
  padding: 10px;
}

.auth-buttons {
  display: flex;
  justify-content: left;
  margin: 10px;
}

.auth-button {
  padding: 10px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.auth-button:focus {
  outline: none;
}

.auth-input {
  width: 85%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #d7d7d9;
  border-radius: 5px;
}

.auth-input:focus {
  outline: none;
}

#button-authorization {
  background: none;
  color: #345255;
}

#button-authorization:hover {
  text-decoration: underline;
}

#button-enter {
  background: #487175;
  color: white;
}

#button-enter:hover {
  background: #345255;
}
</style>