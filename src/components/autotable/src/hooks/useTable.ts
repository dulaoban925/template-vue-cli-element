/**
 * AutoTable table props
 * @anchor SuperYing
 * @date 2022/06/28 09:16:06
 */
import { toRefs } from 'vue'
import { pick } from 'lodash'
import { ElTable } from 'element-plus'
export default function useTable(props: typeof ElTable.props) {
  const result = {
    ...pick(toRefs(props), Object.keys(ElTable.props)),
  }
  return result
}
