<template>
  <div class="header">
    <div class="name-text unselectable">GRADIENT MESSENGER</div>
    <AccountMenu v-if='isLoggedIn'/>
  </div>
</template>

<script>
import AccountMenu from "@/components/AccountMenu";
import {mapGetters} from "vuex";

export default {
  name: "SiteHeader",
  components: {AccountMenu},
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
  },
}
</script>

<style>
.header {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  /*background-color: #345255;*/
  background-color: white;
  margin: 0;
  top: 0;
  padding: 0;
  height: 35px;
  width: 100%;
}

.name-text {
  /*position: absolute;*/
  font-size: 30px;
  /*margin: 5px;*/
  font-weight: 1000;
  width: 100%;
  text-align: center;
  background-image: linear-gradient(to right, #58b6b9, #edf1cf);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  z-index: -1;
}

.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently
                                  not supported by any browser */
}
</style>