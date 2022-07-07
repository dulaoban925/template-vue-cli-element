<!--
  用户管理
  @anchor SuperYing
  @date 2022/07/06 20:16:56
 -->
<template>
  <div class="user-manage">
    <gg-auto-table
      :data="data"
      border
      pagable
      v-model:pageSize="pageSize"
      v-model:current-page="currentPage"
      :total="total"
      :layout="layout"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChang">
      <el-table-column />
    </gg-auto-table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { usePagination } from '@/hooks'
import { queryByPage } from '@/api/systemmanage/user'

const filter = ref({})

const {
  data,
  pageSize,
  currentPage,
  total,
  layout,
  pageSizes,
  query,
  handleSizeChange,
  handleCurrentChang,
} = usePagination(queryByPage, filter)
</script>
