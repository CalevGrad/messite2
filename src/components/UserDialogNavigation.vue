<template>
  <div class="left-block">

    <div class="menu">
      <Search
          @search="search"
          @stop-search="stopSearch"
      />
    </div>

    <div class="box" v-show="showDialogs">
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

    <div class="box" v-show="!showDialogs">
      <UserItem
          v-for="user of users"
          :key="user.id"
          :id="user.id"
          :username="user.username"
      />
    </div>


  </div>
</template>

<script>
import DialogItem from "@/components/DialogItem";
import Search from "@/components/Search";
import mailApi from '@/api/mail.api'
import {mapState} from "vuex";
import UserItem from "@/components/UserItem";

export default {
  name: "UserDialogNavigation",
  components: {
    DialogItem,
    Search,
    UserItem,
  },
  data() {
    return {
      dialogs: [],
      users: [],
      currentDialogId: -1,
      showDialogs: true,
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
    clickDialog(id, username) {
      if (this.currentDialogId === id)
        return

      console.log(`${id} ${username}`)

      let dia
      if (this.currentDialogId !== -1) {
        dia = this.dialogs.find(t => t.id === this.currentDialogId)
        this.$set(dia, "active", false)
      }

      const dialog = this.dialogs.find(t => t.id === id)
      this.$set(dialog, "active", true)
      this.currentDialogId = id

      this.$emit('click-dialog', id, username)
    },
    async search(username) {
      this.showDialogs = false
      let response = await mailApi.searchUser({username: username})
      this.users = response.data.results
    },
    stopSearch() {
      this.users = []
      this.showDialogs = true
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
  background-color: white;
  border-radius: 5px 0 0 0;
  border-bottom: 1px solid #c9c9ca;
}

.box {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 480px;
  background-color: white;
  /*border-radius: 0 0 0 5px;*/
}
</style>