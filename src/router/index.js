import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainPage.vue'),
    meta: {
      title: 'Все формулы'
    }
  },
  {
    path: '/addFormula',
    name: 'addFormula',
    component: () => import('../views/AddPage.vue'),
    meta: {
      title: 'Добавить формулу'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title';
  next();
});

export default router
