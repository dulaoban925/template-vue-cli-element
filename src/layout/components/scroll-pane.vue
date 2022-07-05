<!--
  页签视图滚动容器
  @anchor SuperYing
  @date 2022/07/02 14:16:51
 -->
<template>
  <el-scrollbar ref="scrollPaneRef" :class="ns.b()" @scroll="handleScroll">
    <slot />
  </el-scrollbar>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { useNamespace } from '@/hooks'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'ScrollPane',
})

const ns = useNamespace('scroll-pane')
const scrollPaneRef = ref(null)

// 处理滚动
const handleScroll = ({ scrollLeft, scrollTop }: { scrollLeft: number; scrollTop: number }) => {
  console.log(scrollLeft, scrollTop)
}

// 移动到指定页签
const moveTo = (tag: HTMLElement) => {
  console.log('move to')
}

defineExpose({ moveTo })
</script>
