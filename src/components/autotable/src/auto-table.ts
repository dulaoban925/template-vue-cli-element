/**
 * 全功能 table(兼容 ElTable 用法的基础上扩展更多 )
 * @anchor SuperYing
 * @date 2022/06/16 23:02:24
 */
import {
  defineComponent,
  h,
  toRefs,
  ref,
  watch,
  reactive,
  computed,
  provide,
  watchEffect,
} from 'vue'
import { useNamespace } from '@/hooks'
import { ElTable, ElPagination } from 'element-plus'
import ElAutoTableOperation from './operations'
import { COLUMN_KEY, AUTO_TABLE } from './constants'
import useTable from './hooks/useTable'
import usePagination from './hooks/usePagination'
import type { PropType, VNode } from 'vue'

const COMPONENT_NAME = 'GgAutoTable'
export default defineComponent({
  name: COMPONENT_NAME,
  inheritAttrs: false,
  props: {
    // 是否显示列配置按钮
    settable: {
      type: Boolean,
      default: true,
    },
    // 可见列的column-key集合
    visibleColumnKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    // 是否需要分页器
    pageable: {
      type: Boolean,
      default: false,
    },
    // 分页器位置
    paginationPosition: {
      type: String,
      values: ['start', 'center', 'end'],
      default: 'end',
    },
    ...ElTable.props,
    ...ElPagination.props,
  },
  emits: [
    ...Object.keys(ElTable.emits!),
    ...Object.keys(ElPagination.emits!),
    'visible-columns-change',
  ],
  setup(props, { slots, emit, attrs }) {
    console.log('auto', props)
    const ns = useNamespace('auto-table')

    const table = ref<InstanceType<typeof ElTable>>()
    const pagination = ref<InstanceType<typeof ElPagination>>()

    const { settable, visibleColumnKeys, pageable, paginationPosition } = toRefs(props)

    // table 接收的属性
    const tableProps = useTable(props)
    // pagination 接收的属性
    const paginationProps = usePagination(props)

    // 默认插槽
    const defaultSlot: any = computed(() => slots.default?.() || [])
    // 是否使用 V-for 遍历生成的 table-column
    const isVFor = computed(
      () => defaultSlot.value?.length && defaultSlot.value[0].type.name !== 'ElTableColumn'
    )
    // Table 下所有的列
    const columnNodes = ref<VNode[]>([])

    // 获取所有的表格列
    const getAllColumnNodes = (nodes: any) => {
      const filterNodes = isVFor.value ? nodes[0].children : nodes
      return filterNodes?.filter((node: any) => node.type.name === 'ElTableColumn') || []
    }

    // 可见列 vnode
    const visibleColumnNodes = ref<VNode[]>([])

    // 可见列 column-key，若设置了 visibleColumnKeys属性，以visibleColumnKeys为准；否则获取所有配置了 column-key 属性的列的 column-key 数据
    const currentVisibleKeys = ref<string[]>([])

    watchEffect(() => {
      columnNodes.value = getAllColumnNodes(defaultSlot.value)
      currentVisibleKeys.value = visibleColumnKeys.value?.length
        ? visibleColumnKeys.value
        : columnNodes.value.reduce((ret: string[], node: VNode) => {
            !!node?.props?.[COLUMN_KEY] && ret.push(node?.props?.[COLUMN_KEY])
            return ret
          }, [])
    })

    watch(
      () => currentVisibleKeys.value,
      val => {
        visibleColumnNodes.value = val.reduce((ret: VNode[], key: string) => {
          const matchColumnNode = columnNodes.value.filter(
            columnNode => columnNode?.props?.[COLUMN_KEY] === key
          )[0]
          if (matchColumnNode) ret.push(matchColumnNode)
          return ret
        }, [])
      },
      {
        immediate: true,
      }
    )

    // 筛选区
    const filterNode = computed(() => slots.filter?.())

    // 操作区
    const operationNode = computed(() =>
      h(
        ElAutoTableOperation,
        {
          settable: settable.value,
          columnNodes: columnNodes.value,
          visibleKeys: currentVisibleKeys.value,
          'onUpdate:visibleKeys': (keys: string[]) => {
            currentVisibleKeys.value = keys
            emit('visible-columns-change', keys)
          },
        },
        {
          left: slots['operation-left'] || null,
          right: slots['operation-right'] || null,
        }
      )
    )

    // 表格区
    const tableNode = computed(() =>
      h(
        ElTable,
        reactive({
          ref: (ref: any) => (table.value = ref),
          ...tableProps,
          ...attrs,
        }),
        () => visibleColumnNodes.value
      )
    )

    // 分页区
    const paginationNode = computed(() =>
      h(
        'dev',
        {
          class: ns.b('pagination'),
          style: {
            justifyContent: paginationPosition.value,
          },
        },
        [
          pageable.value
            ? h(
                ElPagination,
                reactive({
                  ref: (ref: any) => (pagination.value = ref),
                  ...paginationProps,
                  'onUpdate:pageSize': (pageSize: number) => emit('update:page-size', pageSize),
                  onSizeChange: (pageSize: number) => emit('size-change', pageSize),
                  'onUpdate:currentPage': (newCurrentPage: number) =>
                    emit('update:current-page', newCurrentPage),
                  onCurrentChange: (newCurrentPage: number) =>
                    emit('current-change', newCurrentPage),
                  onPrevClick: (newCurrentPage: number) => emit('prev-click', newCurrentPage),
                  onNextClick: (newCurrentPage: number) => emit('next-click', newCurrentPage),
                })
              )
            : null,
        ]
      )
    )

    provide(AUTO_TABLE, {
      isVFor: isVFor.value,
    })

    return () =>
      h(
        'div',
        {
          class: ns.b(),
        },
        [filterNode.value, operationNode.value, tableNode.value, paginationNode.value]
      )
  },
})
