<!--
  页签视图
  @anchor SuperYing
  @date 2022/07/02 14:16:51
 -->
<template>
  <div :class="ns.b()">
    <scroll-pane ref="scrollPane" :class="ns.e('wrapper')">
      <router-link
        v-for="(tag, i) in visitedViews"
        :ref="
          el => {
            if (el) tags[i] = el
          }
        "
        :key="tag.fullPath"
        :class="{
          [ns.e('item')]: true,
          active: isActive(tag),
        }"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @contextmenu.prevent="openContextMenu(tag, $event)"
      >
        <el-icon v-if="isActive(tag)">
          <postcard />
        </el-icon>
        <span style="padding: 0 10px">{{ tag.title }}</span>
        <el-icon
          v-if="!isAffix(tag)"
          class="close-icon"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <close />
        </el-icon>
      </router-link>
    </scroll-pane>
    <context-menu v-show="contextMenuVisible" />
  </div>
</template>
<script setup lang="ts">
import { ComponentPublicInstance, computed, ref, watch, onMounted } from 'vue'
import { useNamespace, useTagView } from '@/hooks'
import ScrollPane from './scroll-pane.vue'
import { Postcard, Close } from '@element-plus/icons-vue'
import ContextMenu from './tag-context-menu.vue'
import type { TagView } from '@/store/modules/tag-view'
import path from 'path'
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

// eslint-disable-next-line no-undef
defineOptions({
  name: 'TagView',
})

const ns = useNamespace('tag-view')

const { $store, $route, $router, isActive, isAffix, closeSelectedTag } = useTagView()

// 所有页签的 ref
const tags = ref([] as (Element | ComponentPublicInstance)[])
const scrollPane = ref<HTMLElement | null>(null)

// 当前展示的页签
const visitedViews = computed(() => $store.state.tagView.visitedViews)

console.log(visitedViews.value)
// 右键菜单显隐标识
const contextMenuVisible = ref(false)
const contextMenuPosition = ref({})
const contextMenuSelected = ref<TagView | null>(null)

// TODO:打开右键菜单
const openContextMenu = (tag: TagView, e: MouseEvent) => {
  contextMenuPosition.value = {
    left: 0,
    top: 0,
  }
  contextMenuVisible.value = true
  contextMenuSelected.value = tag
}

// 添加视图
const addTag = () => {
  // route 必须有 name 信息
  if ($route.name) {
    $store.dispatch('tagView/addView', $route)
  }
}

// 筛选出固定的标签
const filterAffixTags = (routes: (RouteRecordNormalized | RouteRecordRaw)[], basePath = '/') => {
  let tags: TagView[] = []
  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = [...tags, ...childTags]
      }
    }
  })
  return tags
}

watch(
  () => $route.fullPath,
  () => {
    addTag()
  },
  {
    immediate: true,
  }
)
</script>
