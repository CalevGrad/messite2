<template>
  <div class="main">

    <DialogNavigation/>
    <Chat/>

  </div>
</template>

<script>
import Chat from "@/components/Chat";
import DialogNavigation from "@/components/DialogNavigation";

export default {
  name: "Mail",
  components: {
    Chat,
    DialogNavigation
  }

}
</script>

<style scoped>

</style>