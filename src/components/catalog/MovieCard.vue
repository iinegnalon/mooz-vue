<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  movie: Object,
});

const naImage = 'N/A';

const placeholder = new URL('@/assets/images/empty-poster.png', import.meta.url)
  .href;
const imgSrc = ref(
  props.movie.Poster !== naImage ? props.movie.Poster : placeholder,
);
const error = ref(false);

function onImgError() {
  imgSrc.value = placeholder;
  error.value = true;
}

watch(
  () => props.movie.Poster,
  (newPoster) => {
    imgSrc.value = newPoster !== naImage ? newPoster : placeholder;
  },
);
</script>

<template>
  <div class="movie-card">
    <img
      :alt="movie.Title"
      :class="{ 'movie-card__image-empty': error || movie.Poster === naImage }"
      :src="imgSrc"
      class="movie-card__image"
      @error="onImgError"
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
