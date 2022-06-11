/**
 * 处理组件 install 方法
 * @anchor SuperYing
 * @date 2022/06/11 21:19:18
 */
import { SFCWithInstall } from './types'
import type { App, Plugin } from 'vue'
import { NOOP } from '@vue/shared'

// 设置组件 install 方法
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      ;(main as any)[key] = value
    }
  }
  return main as SFCWithInstall<T> & E
}

// 组件不需要安装时使用
export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}

// 全局安装组件
export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    for (const component of components) {
      app.use(component)
    }
  }

  return { install }
}
