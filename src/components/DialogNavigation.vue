<template>
  <div class="left-block">

    <div class="menu">
      <Search/>
    </div>

    <div class="dialogs-box">
      <Dialog
          v-for="dialog of dialogs"
          :key="dialog.id"
      />
    </div>

  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Search from "@/components/Search";

export default {
  name: "DialogNavigation",
  components: {
    Dialog,
    Search,
  },
  data() {
    return {
      dialogs: [],
    }
  }
}
</script>

<style scoped>

</style>