import { withInstall } from '@/utils'
import { ElTableColumn } from 'element-plus'
import AutoTable from './src/auto-table'

export const GgAutoTable = withInstall(AutoTable, {
  ElTableColumn,
})
export default GgAutoTable

export * from './src/auto-table'
