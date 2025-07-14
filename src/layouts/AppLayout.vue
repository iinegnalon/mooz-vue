<script setup>
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
</script>

<template>
  <div class="app-layout">
    <LayoutHeader />

    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1145px;
  padding: 0 1rem;
  margin: 0 auto;

  main {
    flex: 1;
    padding: 1rem 0;
  }
}

// Tablet
@media screen and (min-width: $breakpoint-tablet) {
  .app-layout {
    padding: 0 2rem;

    main {
      padding: 2rem 0;
    }
  }
}
</style>
