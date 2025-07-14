<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import BaseLoader from '@/components/common/BaseLoader.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import MovieCard from '@/components/catalog/MovieCard.vue';

const store = useStore();

const movies = computed(() => store.getters['search/results']);
const totalResults = computed(() => store.getters['search/totalResults']);
const totalPages = computed(() => store.getters['search/totalPages']);
const searchError = computed(() => store.getters['search/error']);
const searchQuery = computed(() => store.getters['search/searchQuery']);
const currentPage = computed(() => store.getters['search/currentPage']);
const pageSize = computed(() => store.getters['search/pageSize']);
const moviesLoading = computed(() => store.getters['search/loading']);

function handlePageChange(page) {
  store.commit('search/SET_CURRENT_PAGE', page);
  store.dispatch('search/searchMovies');
  window?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <div class="catalog">
    <div v-if="totalResults" class="catalog__header">
      <div class="catalog__header-text">
        You searched for: <span class="catalog__query">{{ searchQuery }}</span>
      </div>
      <div class="catalog__tag">{{ totalResults }} results</div>
    </div>

    <div
      v-if="!totalResults && !searchError && !moviesLoading"
      class="catalog__placeholder"
    >
      Type a movie title to begin your search.
    </div>

    <div v-if="searchError" class="catalog__error">
      {{ searchError }}
    </div>

    <div v-if="moviesLoading" class="catalog__loader">
      <BaseLoader />
    </div>

    <div v-if="!moviesLoading" class="catalog__grid">
      <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>

    <BasePagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :page-size="pageSize"
      :total-results="totalResults"
      @change="handlePageChange"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.catalog {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 17px;

    &-text {
      font-size: 22px;
    }
  }

  &__query {
    text-decoration: underline;
  }

  &__tag {
    background-color: $color-primary;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 14px;
    line-height: normal;
  }

  &__placeholder,
  &__error {
    font-size: 16px;
    color: $color-dark-gray;
    text-align: center;
    margin-top: 2rem;
  }

  &__grid {
    gap: 55px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 28px;
    margin-bottom: 44px;

    .movie-card {
      flex: 0 0 80%;
    }
  }

  &__loader {
    min-height: 80vh;
  }
}

// Tablet
@media screen and (min-width: $breakpoint-tablet) {
  .catalog {
    &__grid {
      margin-top: 35px;
      margin-bottom: 54px;

      .movie-card {
        flex: 0 0 100%;
        max-width: 245px;
      }
    }
  }
}

// Desktop
@media screen and (min-width: $breakpoint-desktop) {
  .catalog {
    &__grid {
      margin-top: 57px;
      margin-bottom: 84px;
    }
  }
}
</style>
