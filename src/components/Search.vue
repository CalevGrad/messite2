<template>
  <div class="search-box">
    <i class="fas fa-search unselectable" style="margin-right: 5px; color: #818181;"></i>
    <input ref="search_input" type="search" class="search" placeholder="Поиск"
           v-model="searchText"
           v-on:keyup.enter="performSearch">
    <button id="search-clean-button" v-show="searchText" v-on:click="cleanSearch">
      <i class="fas fa-times" style="color: #818181;"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    stopSearchTrigger: {
      required: true,
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    return {
      searchText: '',
      search: false,
    }
  },
  methods: {
    cleanSearch() {
      if (this.search)
        this.$emit('stop-search')
      this.search = false
      this.searchText = ''
    },
    performSearch() {
      this.search = true
      if (this.searchText === '')
        return
      this.$emit('search', this.searchText)
    }
  },
  watch: {
    stopSearchTrigger (newVal) {
      if (newVal)
        this.cleanSearch()
    }
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px;
  width: 100%;
}

.search {
  border: 0;
  flex:1
}

.search:focus  {
  outline: none;
}
</style>