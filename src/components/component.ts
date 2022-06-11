/**
 * 自定义组件导出
 * @anchor SuperYing
 * @date 2022/06/11 21:02:57
 */
import type { Plugin } from 'vue'
import { CompleteMenu } from './completemenu'
import { Toolbar } from './toolbar'

export default [CompleteMenu, Toolbar] as Plugin[]
