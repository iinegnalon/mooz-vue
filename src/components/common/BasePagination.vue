<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalResults: Number,
  pageSize: Number,
});

const emit = defineEmits(['change']);

const totalPages = computed(
  () => Math.ceil(props.totalResults / props.pageSize) || 0,
);
const pagesToShow = computed(() => {
  const total = totalPages.value;
  const current = props.currentPage;
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (current <= 2) {
    pages.push(2);
    pages.push(3);
    pages.push('...');
  } else if (current === 3) {
    pages.push(2);
    pages.push(3);
    pages.push(4);
    pages.push('...');
  } else if (current === total - 2) {
    pages.push('...');
    pages.push(total - 3);
    pages.push(total - 2);
    pages.push(total - 1);
  } else if (current >= total - 1) {
    pages.push('...');
    pages.push(total - 2);
    pages.push(total - 1);
  } else {
    pages.push('...');
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push('...');
  }

  pages.push(total);
  return pages;
});

function goTo(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('change', page);
  }
}
</script>

<template>
  <div class="pagination">
    <div class="pagination__page">
      <button
        :disabled="currentPage === 1"
        class="arrow"
        @click="goTo(currentPage - 1)"
      >
        <img
          v-if="currentPage === 1"
          alt="Left Arrow"
          class="left-arrow"
          src="@/assets/icons/arrow-right-disabled.svg"
        />
        <img
          v-else
          alt="Left Arrow"
          class="left-arrow"
          src="@/assets/icons/arrow-right.svg"
        />
      </button>
    </div>

    <div v-for="page in pagesToShow" :key="page" class="pagination__page">
      <button v-if="page === '...'" class="dots" disabled>...</button>
      <button
        v-else
        :class="{ active: currentPage === page }"
        @click="goTo(page)"
      >
        {{ page }}
      </button>
    </div>

    <div class="pagination__page">
      <button
        :disabled="currentPage === totalPages"
        class="arrow"
        @click="goTo(currentPage + 1)"
      >
        <img
          v-if="currentPage === totalPages"
          alt="Right Arrow"
          src="@/assets/icons/arrow-right-disabled.svg"
        />
        <img v-else alt="Right Arrow" src="@/assets/icons/arrow-right.svg" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &__page {
    height: 27px;
    display: flex;

    &:first-child button {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-child button {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-right: 1px solid $color-gray;
    }

    button {
      padding: 0.4rem 0.6rem;
      font-size: 12px;
      border: 1px solid $color-gray;
      border-right: none;
      background: white;
      cursor: pointer;

      &.active {
        background: $color-light-gray;
      }

      &:disabled {
        cursor: default;
      }

      &.arrow,
      &.dots {
        padding: 0.4rem;
      }

      .left-arrow {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
