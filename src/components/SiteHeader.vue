<template>
  <div class="header">
    <div class="name-text unselectable">GRADIENT MESSENGER</div>
    <div class="description-and-exit-button">
      <div class="description">
<!--        <div id="descr-username">{{ user_descr.username }}</div>-->
<!--        <div id="descr-id">id: {{ user_descr.id }}</div>-->
        <div id="descr-username">username</div>
        <div id="descr-id">id</div>
      </div>
      <button id="button-exit" class="exit-button"
              v-on:click="$emit('click-exit-button')"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteHeader",
  props: {
    // user_descr: {
    //   type: Object,
    //   required: true
    // }
  }
}
</script>
