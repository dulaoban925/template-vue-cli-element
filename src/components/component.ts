/**
 * 自定义组件导出
 * @anchor SuperYing
 * @date 2022/06/11 21:02:57
 */
import type { Plugin } from 'vue'
import { GgCompleteMenu } from './completemenu'
import { GgToolbar } from './toolbar'
import { GgAutoTable } from './autotable'

export default [GgCompleteMenu, GgToolbar, GgAutoTable] as Plugin[]
