<template>
  <div class="user"
       v-bind:class="{'user-active': active}"
       v-on:click="$emit('click-user', id)"
  >
    <div class="user-username">{{ username }}</div>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    username: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: Number,
    },
    active: {
      required: true,
      type: Boolean,
      default: () => false,
    }
  }
}
</script>

<style scoped>
.user {
  display: grid;
  border-top: solid 1px #c9c9ca;
  padding: 10px;
  grid-template-areas:
    "username date"
    "text text";
  cursor: pointer;
}


.user:hover {
  /*background-color: #f5f5f5;*/
  background: linear-gradient(90deg, #b1d6d7, #edf1cf);
}

.user:active {
  /*background-color: #345255;*/
  /*  background-color: #b2c5de;*/
  /*color: white;*/
  background: linear-gradient(90deg, #96d4d6, #edf1cf);
}

.user:nth-child(1) {
  border: 0;
}

.user-username {
  grid-area: username;
  font-weight: 700;
}

.user-active {
  color: white;
  background: #58b6b9;
}

.user-active:hover {
  background: #58b6b9;
}

.user-active .user-username {
  color: white;
}
</style>