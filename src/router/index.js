import { createRouter, createWebHistory } from 'vue-router';
import CatalogView from '@/views/CatalogView.vue';
import AppLayout from '@/layouts/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'Mooz • Catalog',
          component: CatalogView,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || 'Mooz';
  next();
});

export default router;
