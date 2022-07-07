/**
 * 使用 vue 实例
 * @anchor SuperYing
 * @date 2022/06/20 17:42:48
 */
import { getCurrentInstance } from 'vue'

// TODO: 类型待完善
export interface VueGlobalProperties {
  $alert: any
  $confirm: any
  $loading: any
  $message: any
  $messageBox: any
  $msgbox: any
  $notify: any
  $prompt: any
  $route: any
  $router: any
  $store: any
}

export function useInstance() {
  const _this = getCurrentInstance()?.appContext.config.globalProperties
  console.log(_this)

  return { _this, ...(_this as VueGlobalProperties) }
}
