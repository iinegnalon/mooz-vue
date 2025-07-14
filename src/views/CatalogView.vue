<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const movies = computed(() => store.getters['search/results']);
const totalResults = computed(() => store.getters['search/totalResults']);
const totalPages = computed(() => store.getters['search/totalPages']);
const searchError = computed(() => store.getters['search/error']);
const searchQuery = computed(() => store.getters['search/searchQuery']);
</script>

<template>
  <div>
    <div v-if="totalResults">
      You searched for: <span>{{ searchQuery }}</span>
      <div>{{ totalPages }} results</div>
    </div>

    <div v-if="!totalResults && !searchError">
      Type a movie title to begin your search.
    </div>

    <div v-if="searchError">
      {{ searchError }}
    </div>

    <div v-for="movie in movies" :key="movie.imdbID">
      {{ movie.Title }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
