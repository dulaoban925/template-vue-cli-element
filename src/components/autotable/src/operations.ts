/**
 * AutoTable 操作栏
 * @anchor SuperYing
 * @date 2022/06/17 15:38:19
 */
import { defineComponent, toRefs, ref, h, computed, reactive } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useNamespace } from '@bgy-plus/hooks'
import { ElButton, ElTree, ElDialog } from '@bgy-plus/components'
import { COLUMN_KEY } from './constants'
import type { PropType, VNode } from 'vue'

const COMPONENT_NAME = 'ElAutoTableOperation'
export default defineComponent({
  name: COMPONENT_NAME,
  props: {
    columnNodes: Array as PropType<VNode[]>,
    // 是否显示列配置按钮
    settable: Boolean,
    // 显示的 columnKeys
    visibleKeys: Array as PropType<string[]>,
  },
  emits: ['update:visibleKeys'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('auto-table-operation')

    const treeRef = ref(null)

    // 弹窗显隐标识
    const dialogVisible = ref(false)

    const { columnNodes, visibleKeys } = toRefs(props)

    // tip: el-table-column 的 column-key 属性必需
    const columns = computed(
      () =>
        columnNodes.value
          ?.map((value) => value.props)
          ?.filter((value) => value?.[COLUMN_KEY]) || []
    )

    // 默认选中的key，以传入的 visibleKeys 为准，若无 visibleKeys，则选中所有可选行项目
    const defaultCheckedKeys = computed(() =>
      visibleKeys.value?.length
        ? visibleKeys.value
        : columns.value?.map((column) => column?.[COLUMN_KEY])
    )

    // 设置列弹窗关闭处理
    const handleDialogBeforeClose = (done) => {
      // 获取选中的key
      const checkedKeys = treeRef.value?.getCheckedKeys()
      emit('update:visibleKeys', checkedKeys)
      done()
    }

    return () =>
      h(
        'div',
        {
          class: ns.b(),
        },
        [
          h(
            'div',
            {
              class: ns.e('left'),
            },
            slots.left?.()
          ),
          h(
            'div',
            {
              class: ns.e('right'),
            },
            [
              h(ElButton, {
                icon: Setting,
                type: 'text',
                class: ns.e('setting-icon'),
                onClick: () => (dialogVisible.value = true),
              }),
              slots.right?.(),
            ]
          ),
          h(
            ElDialog,
            {
              modelValue: dialogVisible.value,
              'onUpdate:modelValue': (value) => (dialogVisible.value = value),
              draggable: true,
              title: '设置行项目',
              customClass: ns.e('dialog'),
              beforeClose: handleDialogBeforeClose,
            },
            {
              default: () =>
                h(
                  ElTree,
                  reactive({
                    ref: (ref) => (treeRef.value = ref),
                    data: columns.value,
                    showCheckbox: true,
                    draggable: true,
                    nodeKey: COLUMN_KEY,
                    defaultCheckedKeys: defaultCheckedKeys.value,
                  })
                ),
            }
          ),
        ]
      )
  },
})
