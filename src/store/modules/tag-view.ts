/**
 * 页签视图 store
 * @anchor SuperYing
 * @date 2022/06/20 22:12:28
 */

import type { RouteLocation, RouteRecordName } from 'vue-router'
import type { Commit } from 'vuex'

export interface TagView extends Partial<RouteLocation> {
  title?: string
}

export interface State {
  visitedViews: TagView[]
  cachedViews: RouteRecordName[]
}

export default {
  namespaced: true,

  state: () => ({
    visitedViews: [], // 查看的页签
    cachedViews: [], // 缓存的页签，仅保存路由名称，用于 keep-alive
  }),

  mutations: {
    // 新增访问页签
    ADD_VISITED_VIEW(state: State, view: TagView) {
      const isExist =
        state.visitedViews.length && state.visitedViews.some(v => v.path === view.path)
      !isExist &&
        state.visitedViews.push(
          Object.assign({}, view, {
            title: (view.meta && view.meta.title) || 'no-name',
          })
        )
    },

    // 新增缓存页签
    ADD_CACHED_VIEW(state: State, view: TagView) {
      if (!view.name) return
      // 若路由 meta 设置了 noCache = false，不缓存
      if (view.meta?.noCache) return
      if (state.cachedViews.includes(view.name)) return
      state.cachedViews.push(view.name)
    },

    // 删除访问页签
    DEL_VISITED_VIEW(state: State, view: TagView) {
      const index = state.visitedViews.findIndex(v => v.path === view.path)
      index > -1 && state.visitedViews.splice(index, 1)
    },

    // 删除缓存页签
    DEL_CACHED_VIEW(state: State, view: TagView) {
      if (!view.name) return
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },

    // 删除其他访问页签
    DEL_OTHER_VISITED_VIEW(state: State, view: TagView) {
      // 路由元数据设置 affix = true 时始终存在，不允许关闭
      state.visitedViews = state.visitedViews.filter(
        v => (v.meta && v.meta.affix) || v.path === view.path
      )
    },

    // 删除其他缓存页签
    DEL_OTHER_CACHED_VIEW(state: State, view: TagView) {
      if (!view.name) return
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) state.cachedViews = state.cachedViews.slice(index, index + 1)
      else state.cachedViews = []
    },

    // 删除所有访问页签
    DEL_ALL_VISITED_VIEW(state: State) {
      state.visitedViews = []
    },

    // 删除所有缓存页签
    DEL_ALL_CACHED_VIEW(state: State) {
      state.cachedViews = []
    },

    // 更新指定页签
    UPDATE_VISITED_VIEW(state: State, view: TagView) {
      if (!state.visitedViews?.length) return
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign({}, v, view)
          break
        }
      }
    },
  },

  actions: {
    // 添加页签
    addView({ commit }: { commit: Commit }, view: TagView) {
      commit('ADD_VISITED_VIEW', view)
      commit('ADD_CACHED_VIEW', view)
    },
    // 删除页签
    delView({ commit }: { commit: Commit }, view: TagView) {
      commit('DEL_VISITED_VIEW', view)
      commit('DEL_CACHED_VIEW', view)
    },
    // 删除其他页签
    delOthersViews({ commit }: { commit: Commit }, view: TagView) {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      commit('DEL_OTHERS_CACHED_VIEWS', view)
    },
    // 删除所有页签
    delAllViews({ commit }: { commit: Commit }) {
      commit('DEL_ALL_VISITED_VIEWS')
      commit('DEL_ALL_CACHED_VIEWS')
    },
  },
}
