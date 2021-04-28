<template>
  <div class="left-block">

    <div class="menu">
      <Search/>
    </div>

    <div class="box" v-show="!searching">
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

    <div class="box" v-show="searching">
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
import {mapState} from "vuex";
import UserItem from "@/components/UserItem";

export default {
  name: "UserDialogNavigation",
  components: {
    DialogItem,
    Search,
    UserItem,
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.currentUser,
    }),
    ...mapState('mail', {
      users: state => state.users,
      dialogs: state => state.dialogs,
      currentDialogId: state => state.currentDialogId,
      currentUserId: state => state.currentUserId,
      searching: state => state.searching,
    })
  },
  methods: {
    clickDialog(id) {
      this.$store.dispatch('mail/dialogClick', id)
    },
    clickUser(id) {
      this.$store.dispatch('mail/userClick', id)
    },
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