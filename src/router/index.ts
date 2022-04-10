import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/home/index'),
  },
]

export default createRouter({
  routes,
  history: createWebHistory(),
})
