<template>
  <div class="search-box">
    <i class="fas fa-search unselectable" style="margin-right: 5px; color: #818181;"></i>
    <input ref="search_input" type="search" class="search" placeholder="Поиск"
           v-model="searchText"
           v-on:keyup.enter="performSearch">
    <button id="search-clean-button" v-show="searching" v-on:click="cleanSearch">
      <i class="fas fa-times" style="color: #818181;"></i>
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Search",
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    ...mapState('mail', {
      searching: state => state.searching,
    })
  },
  methods: {
    cleanSearch() {
      if (this.searching)
        this.$store.dispatch('mail/stopSearchUser')
      this.searchText = ''
    },
    performSearch() {
      if (this.searchText === '')
        this.cleanSearch()
      this.$store.dispatch('mail/searchUser', this.searchText)
    }
  },
  watch: {
    searching (newVal) {
      if (!newVal)
        this.searchText = ''
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