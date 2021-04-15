<template>
  <div class="dropdown">

    <button v-on:click="dropButtonClick" class="dropbtn">
      {{ currentUser.username }}<i class="fas fa-chevron-down"/>
    </button>

    <div id="accountDropdown" ref="accountDropdown" class="dropdown-content unselectable">
      <div class="dropDownItem">Настройки</div>
      <div class="dropDownItem" v-on:click="logout">Выйти</div>
    </div>

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
    },
    dropButtonClick() {
      this.$refs.accountDropdown.classList.toggle("show")
    }
  }
}
</script>

<style scoped>
i {
  display: inline;
  font-size: 10px;
  margin: 0 0 0 5px;
}

.dropDownItem {
  padding: 10px;
  cursor: pointer;
}

/* Dropdown Button */
.dropbtn {
  color: #4c4c4c;
  padding: 7px;
  background-color: white;
  /*font-size: 16px;*/
  border: none;
  cursor: pointer;
  height: 35px;
  width: 90px;
}

/* Dropdown button on hover & focus */
.dropbtn:hover, .dropbtn:focus, .dropDownItem:hover {
  background-color: #ececec;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  /*background-color: #f1f1f1;*/
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}
</style>