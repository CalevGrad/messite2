<template>
  <div class="message">
    <div class="message-top-block">
      <div class="message-owner">{{ username }}</div>
      <div class="message-date">{{ date }}</div>
    </div>
    <div class="message-text" style="white-space: pre-line">{{ text }}</div>
  </div>
</template>

<script>
import dateService from "@/services/date.service";

export default {
  name: "MessageItem",
  props: {
    text: {
      required: true,
      type: String,
      default: '',
    },
    date_create: {
      required: true,
      type: String,
      default: new Date(),
    },
    username: {
      required: true,
      type: String,
    }
  },
  computed: {
    date() {
      return dateService.matchDate(this.date_create)
    }
  }
}
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  padding: 10px 35px;
  /*margin: 1px;*/
}

.message:hover {
  /*background: #f5f5f5;*/
  /*background-color: #b3dbdd;*/

  background: linear-gradient(90deg, #b1d6d7, #edf1cf);
}

.message-top-block {
  display: flex;
}

.message-owner {
  margin-right: 10px;
  color: #345255;
  font-weight: 700;
}

.message-date {
  color: #4f4f4f;
}

.message-text {
  margin-top: 5px;
}
</style>