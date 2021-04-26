<template>
  <div class="right-block">

    <div class="chat-header" v-if="showControls">

      <span>{{username}}</span>

    </div>

    <div id="messages-list" class="messages-box">

      <MessageItem
          v-for="message of messages"
          :key="message.id"
          :date_create="message.date_create"
          :text="message.text"
          :username="message.owner.username"
      />

    </div>

    <div class="pen" v-if="showControls" v-on:keyup.ctrl.enter="clickSendButton">

      <TextareaAutosize
          placeholder="Напишите сообщение..."
          ref="myTextarea"
          v-model="inputMessage"
          :min-height="20"
          :max-height="80"
          class="pen-block-input"
          rows="1"
      />

      <button class="send-button" v-on:click="clickSendButton">
        <i class="far fa-paper-plane"></i>
      </button>

    </div>

  </div>
</template>

<script>
import MessageItem from "@/components/MessageItem";
import mailApi from '@/api/mail.api'

export default {
  name: "Chat",
  components: {
    MessageItem,
  },
  props: {
    dialogId: {
      required: true,
      type: Number,
    },
    username: {
      required: true,
      type: String,
    },
    interlocutorId: {
      required: true,
      type: Number,
    }
  },
  data() {
    return {
      messages: [],
      inputMessage: '',
    }
  },
  methods: {
    clickSendButton() {
      if (this.dialogId === -2)
        mailApi.newDialog([], this.inputMessage)
      else mailApi.newMessage({dialog: this.dialogId, text: this.inputMessage})
      this.inputMessage = ''
    }
  },
  computed: {
    showControls() {
      return this.dialogId !== -1
    },
  },
  watch: {
    async dialogId (newId) {
      if (newId === -1)
        return

      if (newId === -2) {
        this.messages = []
        return
      }

      console.log(newId)
      let response = await mailApi.getMessages({count_messages: 10, dialog_id: newId})
      console.log(response.data.results)
      this.messages = response.data.results
    }
  }
}
</script>

<style scoped>
.right-block {
  display: flex;
  flex-direction: column;
  /*grid-area: right-block;*/
  background: white;
  /*border-radius: 0 5px 5px 0;*/
  height: inherit;
}

.chat-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c9c9ca;
  padding: 10px;
  height: 40px;
  font-weight: bold;
  box-sizing: border-box;
  /*width: 100%;*/
}

.messages-box {
  position: static;
  overflow-y: auto;
  background-color: white;
  flex:1;
}

.pen {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid #c9c9ca;
  /*grid-area: pen;*/
  background-color: white;
  /*border-radius: 0 0 5px 0;*/
}

.pen-block-input {
  border: 1px solid #c9c9ca;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  margin: 10px;
  box-sizing: border-box;
  /*font-size: 10px;*/
  /*word-wrap: anywhere;*/
  /*overflow-y: auto;*/
  /*overflow-x: hidden;*/
  /*max-height: 80px;*/
  /*min-height: 16px;*/
  /*word-break: break-word;*/
}

.pen-block-input:focus {
  outline: 0;
}

.send-button {
  background: white;
  color: #818181;
  font-size: 25px;
  width: 50px;
  /*  border: 0;*/
  height: 50px;
  margin: 5px;
}

.send-button:hover {
  color: #434343;
}
</style>