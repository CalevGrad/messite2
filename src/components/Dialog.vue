<template>
  <div class="dialog"
       v-bind:class="{'dialog-active': dialog.active}"
  >
    <div class="dialog-username">{{ username }}</div>
    <div class="dialog-date">{{ date }}</div>
    <div class="dialog-text">
      <!--      <span class="dia-who" v-if="dialog.owner">Вы:</span> -->
      <span class="dia-text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "Dialog"
}
</script>

<style scoped>

</style>