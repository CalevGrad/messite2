<template>
  <div class="registration" v-on:keyup.enter="registration">
    <div class="reg-text">Регистрация</div>
    <div style="text-align: center;" class="red">
      {{ errorRegistration }}
    </div>
    <form @submit.prevent="registration">
      <input type="login" id="username" class="reg-input" placeholder="Имя пользователя"
             v-model="form.username"
      >
      <input type="password" id="password" class="reg-input" placeholder="Пароль"
             v-model="form.password"
      >
      <div class="reg-buttons">
        <button id="button-enter" class="reg-button" type="submit">Регистрация</button>
        <router-link to="/login" id="button-registration" class="reg-button">К авторизации</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Auth from '@/api/auth.api'
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

.registration {
  margin-top: 150px;
  padding: 5px;
  width: 300px;
  min-height: 220px;
  background: white;
  border-radius: 5px;
}

.reg-text {
  font-size: 20px;
  text-align: center;
  padding: 10px;
}

.reg-input {
  width: 85%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #d7d7d9;
  border-radius: 5px;
}

.reg-input:focus {
  outline: none;
}

.reg-buttons {
  display: flex;
  justify-content: left;
  margin: 10px;
}

.reg-button {
  padding: 10px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.reg-button:focus {
  outline: none;
}

#button-registration {
  background: none;
  color: #345255;
}

#button-registration:hover {
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