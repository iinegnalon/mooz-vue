<script setup>
import BaseInput from '@/components/common/BaseInput.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const searchQuery = computed({
  get() {
    return store.getters['search/searchQuery'];
  },
  set(newValue) {
    store.dispatch('search/updateSearchQuery', newValue);
  },
});

function searchMovies() {
  store.dispatch('search/searchMovies');
}
</script>

<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <img alt="Logo" src="@/assets/images/mooz-logo.png" />
      </div>

      <div class="header__search">
        <BaseInput
          v-model="searchQuery"
          placeholder="Enter the movie title"
          @enter="searchMovies"
          @icon-click="searchMovies"
        >
          <template #icon>
            <img alt="Search" src="@/assets/icons/search.svg" />
          </template>
        </BaseInput>
      </div>

      <div class="header__user">
        <img
          alt="User Icon"
          class="header__user-icon"
          src="@/assets/icons/user.svg"
        />
        <span class="header__user-name">Your Name</span>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.header {
  padding: 1rem 0;

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    height: 32px;

    img {
      height: 32px;
      object-fit: contain;
    }
  }

  &__search {
    flex: 1 1 100%;
    display: flex;
    justify-content: flex-start;
    order: 3;
    margin-top: 0.5rem;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    font-size: 14px;
  }

  &__user-icon {
    width: 25px;
    height: 25px;
  }

  &__user-name {
    display: none;
  }

  // Tablet
  @media screen and (min-width: $breakpoint-tablet) {
    &__logo {
      height: 36px;

      img {
        height: 36px;
      }
    }

    &__search {
      flex: 1 1 auto;
      max-width: 280px;
      justify-content: center;
      order: initial;
      margin-top: 0;
    }

    &__user-name {
      display: block;
    }
  }
}
</style>
