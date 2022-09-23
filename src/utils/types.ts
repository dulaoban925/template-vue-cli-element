/**
 * 类型工具集
 * @anchor SuperYing
 * @date 2022/06/11 21:19:05
 */
import { Plugin } from 'vue'

// 可安装的单文件组件类型
export type SFCWithInstall<T> = T & Plugin
