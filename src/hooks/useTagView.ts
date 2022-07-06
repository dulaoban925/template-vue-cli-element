/**
 * 页签相关 hooks
 * @anchor SuperYing
 * @date 2022/07/02 21:18:37
 */
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import type { TagView } from '@/store/modules/tag-view'

export function useTagView() {
  const $store = useStore()
  const $route = useRoute()
  const $router = useRouter()

  // 判断指定页签是否激活
  function isActive(view: TagView) {
    return view.path === $route.path
  }

  // 页签是否固定
  function isAffix(view: TagView) {
    return view.meta && view.meta.affix
  }

  // 关闭指定页签
  function closeSelectedTag(view: TagView, ifToLastView = true) {
    $store.dispatch('tagView/delView', view)
    if (isActive(view) && ifToLastView) toLastView($store.state.tagsView.visitedViews)
  }

  // 跳转到最后一个页签
  function toLastView(visitedViews: TagView[]) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      $router.push(latestView.fullPath)
    } else {
      // 若无下一个可跳转页面，跳转到首页
      $router.push('/')
    }
  }

  return {
    $store,
    $route,
    $router,
    isActive,
    isAffix,
    closeSelectedTag,
    toLastView,
  }
}
