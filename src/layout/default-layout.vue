<!--
  默认 Layout
  @anchor SuperYing
  @date 2022/06/11 21:20:09
 -->
<template>
  <div class="app-wrapper">
    <gg-toolbar title="SuperYing 的前端模板" />
    <el-container class="content-container">
      <gg-complete-menu :data="menuData" @select="handleMenuSelect" />
      <el-main class="page-wrapper">
        <tag-view />
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { MenuItemClicked } from 'element-plus'
import { ref } from 'vue'
import { NavigationFailure } from 'vue-router'
import AppMain from './components/app-main.vue'
import TagView from './components/tag-view.vue'
import { useRouter } from 'vue-router'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'DefaultLayout',
})

const $router = useRouter()

const menuData = ref([
  {
    index: 'system-manage',
    label: '菜单管理',
    children: [
      {
        index: '/system-manage/user',
        label: '用户管理',
      },
      {
        index: '/system-manage/menu',
        label: '菜单管理',
      },
      {
        index: '/system-manage/auth',
        label: '权限管理',
      },
      {
        index: '/system-manage/role',
        label: '角色管理',
      },
    ],
  },
  {
    index: '2',
    label: '一级菜单2',
    children: [
      {
        index: '2.1',
        label: '二级菜单2.1',
      },
      {
        index: '2.2',
        label: '二级菜单2.2',
      },
      {
        index: '2.3',
        label: '二级菜单2.3',
      },
    ],
  },
])

// 选择菜单
const handleMenuSelect = (
  index: string,
  indexPath: string[],
  item: MenuItemClicked,
  routerResult?: Promise<void | NavigationFailure>
) => {
  $router.push(index)
}
</script>
