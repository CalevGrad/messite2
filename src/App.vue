<template>
  <div id="app" class="center-block">
    <SiteHeader/>
    <router-view/>
  </div>
</template>

<script>
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementById("accountDropdown");
      if (dropdowns.classList.contains('show')) {
        dropdowns.classList.remove('show');
      }
  }
}

import router from "@/router/router";
import store from "@/store";
import SiteHeader from "@/components/SiteHeader";

export default {
  name: 'App',
  router: router,
  store: store,
  components: {
    SiteHeader,
  },
}
</script>

<style>
@import './style/main.css';
@import './style/fontawesome/css/all.css';

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

input[type="search"]::-ms-clear {
  display: none;
}

#search-clean-button {
  background: white;
}
</style>