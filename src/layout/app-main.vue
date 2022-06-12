<!--
  应用页面入口
  @anchor SuperYing
  @date 2022/06/11 21:20:25
 -->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedView">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'AppMain',
})

// 缓存的页面组件
const cachedView = ref([])
</script>
