<template>
  <div class="right-block">

    <div id="messages-list" class="messages-box">

      <Message
          v-for="message of messages"
          :key="message.id"
          :date_create="message.date_create"
          :text="message.text"
      />

    </div>

    <div class="pen" v-if="dialogId > -1" v-on:keyup.ctrl.enter="clickSendButton">

<!--      <div id="send_text" class="pen-block-input" tabindex="0" contenteditable="true" role="textbox"-->
<!--           aria-multiline="true"-->
<!--           ref="sendTextInput"></div>-->

<!--      <textarea class="pen-block-input"></textarea>-->
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
import Message from "@/components/Message";

export default {
  name: "Chat",
  components: {
    Message,
  },
  props: {
    dialogId: {
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
      this.inputMessage = ''
    }
  }
}
</script>

<style scoped>
.right-block {
  display: flex;
  flex-direction: column;
  grid-area: right-block;
  background: white;
  /*border-radius: 0 5px 5px 0;*/
  height: inherit;
}

.messages-box {
  position: static;
  height: 100%;
  overflow-y: auto;
  background-color: white;
}

.pen {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid #c9c9ca;
  grid-area: pen;
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