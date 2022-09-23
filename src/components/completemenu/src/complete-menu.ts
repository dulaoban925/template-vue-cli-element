import { defineComponent, toRefs, h, Component } from 'vue'
import { ElIcon, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu } from 'element-plus'
import { useNamespace } from '@/hooks'

export type MenuItem = {
  index: string
  label: string
  icon: Component
  title: string
  children: MenuItem[]
}

export default defineComponent({
  name: 'GgCompleteMenu',
  props: {
    // 菜单数据
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { attrs }) {
    const ns = useNamespace('complete-menu')
    // 生成 menu 内容
    const { data } = toRefs(props)

    // 渲染 icon
    const renderIcon = (menu: MenuItem) => {
      return menu.icon ? h(ElIcon, () => menu.icon) : null
    }

    const renderMenuContext = (menu: MenuItem, Component: any) => {
      return h(
        Component,
        {
          index: menu.index,
        },
        {
          default: () => (menu.children?.length ? genMenuContent(menu.children) : null),
          title: () => [renderIcon(menu), menu.title || menu.label],
        }
      )
    }

    // 生成菜单项
    const genMenuContent = (data: MenuItem[] = []) => {
      const result = []
      for (let i = 0; data && i < data.length; i++) {
        const item = data[i]
        const renderComp =
          item.children?.length && item.title
            ? ElMenuItemGroup
            : item.children?.length
            ? ElSubMenu
            : ElMenuItem

        const renderer = renderMenuContext(item, renderComp)

        result.push(renderer)
      }

      return result
    }

    const defaultSlot = () => genMenuContent(data.value as unknown as MenuItem[])

    return () =>
      h(
        ElMenu,
        {
          class: ns.b(),
          ...attrs,
        },
        {
          default: defaultSlot,
        }
      )
  },
})
