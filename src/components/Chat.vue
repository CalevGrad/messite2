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

    <div class="pen" v-show="isPenVisible" v-on:keyup.ctrl.enter="clickSendButton">

      <div id="send_text" class="pen-block-input" tabindex="0" contenteditable="true" role="textbox"
           aria-multiline="true"
           ref="sendTextInput"></div>

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
  data() {
    return {
      messages: [],
      isPenVisible: false,
    }
  },
  methods: {
    clickSendButton() {

    }
  }
}
</script>

<style scoped>

</style>