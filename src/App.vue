<template>
  <div id="app" class="center-block">
    <SiteHeader/>
    <router-view/>
  </div>
</template>

<script>
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
/*@import './style/main.css';*/
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

button {
  outline: none;
  border: 0;
  cursor: pointer;
}

body {
  margin: 0;
  padding: 0;
  color: #0f1532;
  /*background-color: #edeef0;*/
  /*background-color: #7e8ea5;*/
  /*background: linear-gradient(90deg, #58b6b9, #edf1cf);*/
  background: url('./assets/fon.png')no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-size: 13px;
  font-family: -apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,"Noto Sans Armenian",
  "Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian",
  "Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil",
  "Noto Sans Telugu","Noto Sans Thai",sans-serif;

  scrollbar-width: thin;
  scrollbar-color: #b1d6d7 white;
}

.center-block {
  display: flex;
  justify-content: center;
}

#search-clean-button {
  background: white;
}
</style>