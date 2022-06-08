<template>
  <div class="app-wrapper">
    <!-- toolbar -->
    <el-container class="content-container">
      <complete-menu />
      <el-main class="page-wrapper"></el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { CompleteMenu } from '@/components/index'

// eslint-disable-next-line no-undef
defineOptions({
  name: 'DefaultLayout',
})
</script>
