<template>
  <div class="left-block">

    <div class="menu">
      <Search/>
    </div>

    <div class="dialogs-box">
      <DialogItem
          v-for="dialog of dialogs"
          :key="dialog.id"
          :id="dialog.id"
          :owners="dialog.owners"
          :last_message="dialog.last_message"
          :active="dialog.active"
          :user="currentUser"
          @click-dialog="clickDialog"
      />
    </div>


  </div>
</template>

<script>
import DialogItem from "@/components/DialogItem";
import Search from "@/components/Search";
import mailApi from '@/api/mail.api'
import {mapState} from "vuex";

export default {
  name: "DialogNavigation",
  components: {
    DialogItem,
    Search,
  },
  data() {
    return {
      dialogs: [],
      currentDialogId: -1,
    }
  },
  async mounted() {
    let response = await mailApi.getDialogs()
    this.dialogs = response.data.results
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.currentUser,
    }),
  },
  methods: {
    clickDialog(id) {
      if (this.currentDialogId === id)
        return

      console.log(id)

      let dia
      if (this.currentDialogId !== -1) {
        dia = this.dialogs.find(t => t.id === this.currentDialogId)
        this.$set(dia, "active", false)
      }

      const dialog = this.dialogs.find(t => t.id === id)
      this.$set(dialog, "active", true)
      this.currentDialogId = id

      this.$emit('click-dialog', id)
    }
  },
}
</script>

<style scoped>
.left-block {
  grid-area: left-block;
  background: white;
  /*border-radius: 5px 0 0 5px;*/
  border-right: 1px solid #c9c9ca;
  height: inherit;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 39px;
  grid-area: menu;
  background-color: white;
  border-radius: 5px 0 0 0;
  border-bottom: 1px solid #c9c9ca;
}

.dialogs-box {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 480px;
  grid-area: dialogs;
  background-color: white;
  /*border-radius: 0 0 0 5px;*/
}
</style>