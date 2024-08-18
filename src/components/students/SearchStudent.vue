<template>
  <input v-model="searchQuery" @input="searchStudent" placeholder="Search students..." />
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    searchStudent() {
      this.$emit('search-student', this.searchQuery);
    }
  }
};
</script>