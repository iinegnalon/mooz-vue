<script setup>
defineProps({
  movie: Object,
});
</script>

<template>
  <div class="movie-card">
    <img
      v-if="movie.Poster !== 'N/A'"
      :alt="movie.Title"
      :src="movie.Poster"
      class="movie-card__image"
    />
    <img
      v-else
      :alt="movie.Title"
      class="movie-card__image movie-card__image-empty"
      src="@/assets/images/empty-poster.png"
    />

    <div class="movie-card__info">
      <p>Name: {{ movie.Title }}</p>
      <p>Year: {{ movie.Year }}</p>
      <p>imdbID: {{ movie.imdbID }}</p>
      <p>Type: {{ movie.Type }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.movie-card {
  display: flex;
  flex-direction: column;
  gap: 23px;

  &__image {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    background-color: $color-background;
    border-radius: 10px;

    &-empty {
      object-fit: contain;
      border: 1px solid $color-primary;
    }
  }

  &__info {
    margin: 0 13px;

    p {
      font-size: 16px;
      margin: 0;
      line-height: normal;
    }
  }
}

// Tablet
@media screen and (min-width: $breakpoint-tablet) {
  .movie-card {
    &__info {
      p {
        font-size: 14px;
      }
    }
  }
}

// Desktop
@media screen and (min-width: $breakpoint-desktop) {
  .movie-card {
    &__info {
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
