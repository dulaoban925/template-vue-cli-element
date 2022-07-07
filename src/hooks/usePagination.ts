/**
 * 分页 hooks
 * @anchor SuperYing
 * @date 2022/07/07 09:08:38
 */

import { onMounted, Ref, ref } from 'vue'
import { useInstance } from './useInstance'

interface FnParams {
  [propName: string]: unknown
}

interface FnResult {
  total: number
  data: object[]
}

interface Pagination {
  pageSize: number
  currentPage: number
}

export function usePagination(
  fn: (params: FnParams, pagination: Pagination) => Promise<FnResult>,
  params: Ref<FnParams>
) {
  const _this = useInstance()

  // 每页数据量
  const pageSize = ref(10)
  // 当前页
  const currentPage = ref(1)
  // 数据总量
  const total = ref(1)
  // 分页器布局
  const layout = 'total, sizes, prev, pager, next, jumper'
  // 分页器页数
  const pageSizes = [10, 20, 50, 100]
  // 列表数据
  const data = ref<object[]>([])

  // 获取数据
  const query = async () => {
    if (!fn || typeof fn !== 'function') {
      _this.$message.warn('请正确传递查询函数')
      return
    }
    const { data: resData, total: resTotal } = await fn(params.value, {
      pageSize: pageSize.value,
      currentPage: currentPage.value,
    })
    data.value = resData
    total.value = resTotal
  }

  // 切换每页数量
  const handleSizeChange = (size: number) => {
    pageSize.value = size
    query()
  }

  // 当前页改变时触发
  const handleCurrentChang = (page: number) => {
    console.log(page)
    currentPage.value = page
    query()
  }

  onMounted(() => {
    query()
  })

  return {
    pageSize,
    currentPage,
    total,
    layout,
    pageSizes,
    data,
    query,
    handleSizeChange,
    handleCurrentChang,
  }
}
