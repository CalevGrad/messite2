<template>
  <div class="description-and-exit-button">
    <div class="description">
      <div id="descr-username">{{ currentUser.username }}</div>
      <div id="descr-id">id: {{ currentUser.id }}</div>
    </div>
    <button id="button-exit" class="exit-button"
      v-on:click="logout"
    >
      Выйти
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AccountMenu",
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.currentUser,
    }),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      await this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>