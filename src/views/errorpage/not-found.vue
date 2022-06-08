<!--
  404 page
  @anthor SuperYing
-->
<template>
  <div v-html="content" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// eslint-disable-next-line no-undef
defineOptions({
  name: 'NotFound',
})

const content = ref('')

onMounted(() => {
  // 复用nginx服务器404的源码
  axios.get('./static/nginx404.html').then((res: any) => {
    content.value = res.data
  })
})
</script>
