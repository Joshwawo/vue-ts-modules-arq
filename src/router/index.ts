import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//Routes are defined in the router/index.ts file.
import HomeRouter from '@/modules/home/router/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('@/modules/home/layouts/HomeLayout.vue'),
      children: HomeRouter
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Vue 3 Modules Arq + naiveUi'
  next();
})

export default router
