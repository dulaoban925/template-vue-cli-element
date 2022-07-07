/**
 * AutoTable pagination props
 * @anchor SuperYing
 * @date 2022/06/28 09:24:01
 */
import { toRefs } from 'vue'
import { pick } from 'lodash'
import { ElPagination } from 'element-plus'
export default function usePagination(props: typeof ElPagination.props) {
  const result = {
    ...pick(toRefs(props), Object.keys(ElPagination.props)),
  }
  return result
}
