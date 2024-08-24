import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        name: 'home-view',
        component: () => import('../views/HomeView.vue'),
    },

]

export default routes
// This is a cast to avoid the error: Type 'RouteRecordRaw[]' is not assignable to type 'Readonly<RouteRecordRaw[]>'