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
  const onSides = 1;

  const total = totalPages.value;
  const current = props.currentPage;
  const pages = [];

  for (let i = 1; i <= total; i++) {
    let offset = i === 1 || total ? onSides + 1 : onSides;
    if (
      i === 1 ||
      (current - offset <= i && current + offset >= i) ||
      i === current ||
      i === total
    ) {
      pages.push(i);
    } else if (i === current - (offset + 1) || i === current + (offset + 1)) {
      pages.push('...');
    }
  }

  return pages;
});

function goTo(page) {
  if (page === props.currentPage) return;

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
        <img alt="Right Arrow" src="@/assets/icons/arrow-right.svg" />
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
      padding: 0.2rem 0.6rem;
      font-size: 12px;
      border: 1px solid $color-gray;
      border-right: none;
      background: white;
      cursor: pointer;

      &.active {
        background: $color-light-gray;
        cursor: default;
      }

      &:disabled {
        cursor: default;
        color: inherit;

        img {
          opacity: 0.5;
          filter: grayscale(50%);
        }
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
