import { createStore } from 'vuex'
import tagView from './modules/tag-view'

// Vuex 模块
const modules = {
  tagView,
}
export default createStore({ modules })
