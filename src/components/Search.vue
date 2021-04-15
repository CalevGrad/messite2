<template>
  <div class="search-box">
    <i class="fas fa-search unselectable" style="margin-right: 5px; color: #818181;"></i>
    <input ref="search_input" type="search" class="search" placeholder="Поиск"
           v-model="searchText"
           v-on:keyup.enter="performSearch">
    <button id="search-clean-button" v-if="searchText" v-on:click="cleanSearch">
      <i class="fas fa-times" style="color: #818181;"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    cleanSearch() {
      this.searchText = ''
    },
    performSearch() {
    //  выполнить поиск
    }
  }
}
</script>

<style scoped>

</style>