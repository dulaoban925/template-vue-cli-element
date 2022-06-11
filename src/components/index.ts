/**
 * 自定义组件安装
 * @anchor SuperYing
 * @date 2022/06/11 21:03:20
 */
import { makeInstaller } from '@/utils/with-install'
import components from './component'

export default makeInstaller(components)
