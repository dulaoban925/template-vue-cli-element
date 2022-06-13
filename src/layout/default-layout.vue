<!--
  默认 Layout
  @anchor SuperYing
  @date 2022/06/11 21:20:09
 -->
<template>
  <div class="app-wrapper">
    <toolbar title="SuperYing 的前端模板" />
    <el-container class="content-container">
      <complete-menu />
      <el-main class="page-wrapper">
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import AppMain from './app-main.vue'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'DefaultLayout',
})
</script>
