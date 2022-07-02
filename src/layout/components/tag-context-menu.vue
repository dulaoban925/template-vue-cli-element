<!--
  页签右键菜单
  @anchor SuperYing
  @date 2022/07/02 21:38:37
 -->
<template>
  <div :class="ns.b()"></div>
</template>
<script setup lang="ts">
import { useNamespace } from '@/hooks'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'TagContextMenu',
})

const ns = useNamespace('tag-context-menu')
</script>
