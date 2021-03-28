<template>
  <div>
    <SiteHeader/>
    <router-view/>
  </div>
</template>

<script>

import router from "@/router/router";
import SiteHeader from "@/components/SiteHeader";

export default {
  name: 'App',
  router: router,
  components: {
    SiteHeader,
  }
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