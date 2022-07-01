import { createStore } from 'vuex'
import tagsView from './modules/tags-view'

// Vuex 模块
const modules = {
  tagsView,
}
export default createStore({ modules })
