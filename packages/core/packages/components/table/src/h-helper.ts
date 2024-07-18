// @ts-nocheck
import { h } from 'vue'
export function hColgroup(props) {
  const isAuto = props.tableLayout === 'auto'
  let columns = props.columns.value || []

  if (isAuto) {
    // auto 没有width时候，自动分配
    if (columns.every((column) => column.width === undefined)) {
      columns = []
    }
  }
  const getPropsData = (column) => {
    const propsData = {
      key: `${props.tableLayout}_${column.id}`,
      style: {},
      name: undefined
    }
    // auto 布局时，添加width
    if (isAuto && (column.width || column.minWidth)) {
      propsData.style = {
        width: `${column.width || column.minWidth}px`
      }
    } else {
      // fixed布局时，添加realWidth
      propsData.name = column.id
      propsData.style = {
        width: `${column.realWidth}px`
      }
    }
    return propsData
  }

  return h(
    'colgroup',
    {},
    columns.map((column) => h('col', getPropsData(column)))
  )
}

hColgroup.props = ['columns', 'tableLayout']
