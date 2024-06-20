import type { VNode } from 'vue'
export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}
export const isNumber = (val: unknown): val is string => {
  return typeof val === 'number'
}
export const isNil = (val: unknown): val is string => {
  return val === null || val === undefined
}

export const isUndefined = (val: any): val is undefined => val === undefined

export function isVNode(node: any): node is VNode {
  return node && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'type')
}
