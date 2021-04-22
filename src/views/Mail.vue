<template>
  <div class="main">

    <DialogNavigation @click-dialog="dialogClicked"/>
    <Chat
        :dialogId="currentDialogId"
        :username="usernameInterlocutor"
    />

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
  },
  data() {
    return {
      currentDialogId: -1,
      usernameInterlocutor: '',
    }
  },
  methods: {
    dialogClicked(id, username) {
      this.currentDialogId = id
      this.usernameInterlocutor = username
    }
  }
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