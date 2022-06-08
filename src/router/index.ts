import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/default-layout.vue'

// 401
const noAuthComponent = () => import('@/views/errorpage/no-auth.vue')

// 404
const notFoundComponent = () => import('@/views/errorpage/not-found.vue')

// 工作台
import Dashboard from '@/views/dashboard/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/401',
    name: 'NoAuth',
    component: noAuthComponent,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: notFoundComponent,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '工作台', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
