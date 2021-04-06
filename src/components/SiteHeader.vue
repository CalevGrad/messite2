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
