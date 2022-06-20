<!--
  默认 Layout
  @anchor SuperYing
  @date 2022/06/11 21:20:09
 -->
<template>
  <div class="app-wrapper">
    <toolbar title="SuperYing 的前端模板" />
    <el-container class="content-container">
      <complete-menu :data="menuData" />
      <el-main class="page-wrapper">
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AppMain from './app-main.vue'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'DefaultLayout',
})

const menuData = ref([
  {
    index: '1',
    label: '一级菜单1',
    children: [
      {
        index: '1.1',
        label: '二级菜单1.1',
      },
      {
        index: '1.2',
        label: '二级菜单1.2',
      },
      {
        index: '1.3',
        label: '二级菜单1.3',
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
</script>
