<!--
  应用页面入口
  @anchor SuperYing
  @date 2022/06/11 21:20:25
 -->
<template>
  <section :class="ns.b()">
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
import { useNamespace } from '@/hooks'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'AppMain',
})

const ns = useNamespace('app-main')

// 缓存的页面组件
const cachedView = ref([])
</script>
