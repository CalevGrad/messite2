<template>
  <div class="message">
    <div class="message-top-block">
      <div class="message-owner">{{ date_create }}</div>
      <div class="message-date">{{ date_create }}</div>
    </div>
    <div class="message-text" style="white-space: pre-line">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    text: {
      required: true,
      type: String,
      default: '',
    },
    date_create: {
      required: true,
      type: [String, Date],
      default: new Date(),
    },
  },
}
</script>

<style scoped>

</style>