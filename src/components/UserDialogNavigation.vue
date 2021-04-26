<template>
  <div class="left-block">

    <div class="menu">
      <Search
          :stopSearchTrigger="stopSearchTrigger"
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
          :active="user.active"
          @click-user="clickUser"
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
      currentUserId: -1,
      showDialogs: true,
      stopSearchTrigger: false,
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
    clickDialog(id, interlocutor) {
      if (this.currentDialogId === id)
        return

      console.log(`${id} ${interlocutor.username}`)

      this.setActiveDialog(id)

      this.$emit('click-dialog', id, interlocutor)
    },
    clickUser(id, username) {
      if (this.currentUserId === id)
        return

      console.log(`user ${id}`)

      let lastUser
      if (this.currentUserId !== -1) {
        lastUser = this.users.find(t => t.id === this.currentUserId)
        this.$set(lastUser, "active", false)
      }

      const user = this.users.find(t => t.id === id)
      this.$set(user, "active", true)
      this.currentUserId = id

      mailApi.existDialog({user_id: id}).then((response) => {
        console.log(response.data)
        this.clickDialog(response.data.id, {id: id, username: username})
        this.stopSearchTrigger = true
        // this.setActiveDialog(response.data.id)
      }).catch((error) => {
        console.log(error.response)
        this.$emit('click-dialog', -2, {id: id, username: username})
      })
    },
    setActiveDialog(id) {
      let lastDialog
      if (this.currentDialogId !== -1) {
        lastDialog = this.dialogs.find(t => t.id === this.currentDialogId)
        this.$set(lastDialog, "active", false)
      }

      const dialog = this.dialogs.find(t => t.id === id)
      this.$set(dialog, "active", true)
      this.currentDialogId = id
    },
    async search(username) {
      this.showDialogs = false
      let response = await mailApi.searchUser({username: username})
      this.users = response.data.results
    },
    stopSearch() {
      this.users = []
      this.currentUserId = -1
      this.stopSearchTrigger = false
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