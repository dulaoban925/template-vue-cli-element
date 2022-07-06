/**
 * 系统管理路由
 * @anchor SuperYing
 * @date 2022/07/06 20:22:46
 */
import { Component } from 'vue'

const User = () => import('@/views/systemmanage/user.vue')
const Menu = () => import('@/views/systemmanage/menu.vue')
const Auth = () => import('@/views/systemmanage/auth.vue')
const Role = () => import('@/views/systemmanage/role.vue')

export function useSystemManage(Layout: Component) {
  return {
    path: '/system-manage',
    name: 'SystemManage',
    component: Layout,
    redirect: '/system-manage/user',
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: User,
        meta: { title: '用户管理' },
      },
      {
        path: 'menu',
        name: 'Menu',
        component: Menu,
        meta: { title: '菜单管理' },
      },
      {
        path: 'auth',
        name: 'Auth',
        component: Auth,
        meta: { title: '权限管理' },
      },
      {
        path: 'role',
        name: 'Role',
        component: Role,
        meta: { title: '角色管理' },
      },
    ],
  }
}
