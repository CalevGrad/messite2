<template>
  <div class="main">

    <UserDialogNavigation/>
    <Chat/>

  </div>
</template>

<script>
import Chat from "@/components/Chat";
import UserDialogNavigation from "@/components/UserDialogNavigation";

export default {
  name: "Mail",
  components: {
    Chat,
    UserDialogNavigation
  },
}
</script>

<style scoped>
.main {
  display: grid;
  margin-top: 50px;
  width: 900px;
  height: 520px;
  grid-template-columns: 2fr 4fr;
  /*grid-gap: 1px;*/
  grid-template-areas:
    "left-block right-block";
}
</style>