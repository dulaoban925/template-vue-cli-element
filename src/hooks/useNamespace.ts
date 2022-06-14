/**
 * 命名空间 hooks
 * 用来处理 class 类名
 * 类名采用 block、element、modifier 模式命名（即 bem）
 */
// 命名空间，与 scss 命名空间一致
export const globalNamespace = 'gg'
// 状态 class 类前缀
const statePrefix = 'is-'

// 处理 class 类名
const _bem = (block: string, blockSuffix?: string, element?: string, modifier?: string) => {
  let cls = `${globalNamespace}-${block}`
  if (blockSuffix) cls += `-${blockSuffix}`
  if (element) cls += `__${element}`
  if (modifier) cls += `--${modifier}`
  return cls
}

export function useNamespace(block: string) {
  // block 类名
  const b = (blockSuffix = '') => _bem(block, blockSuffix)
  // element 类名
  const e = (element?: string) => (element ? _bem(block, '', element) : '')
  // modifier 类名
  const m = (modifier?: string) => (modifier ? _bem(block, '', '', modifier) : '')
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(block, blockSuffix, element) : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(block, '', element, modifier) : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier ? _bem(block, blockSuffix, element, modifier) : ''
  // 状态类 is-
  const is = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0] : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // css 变量 --gg-xxx: value
  const cssVarName = (name: string) => `--${globalNamespace}-${name}`
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[cssVarName(key)] = object[key]
    }
    return styles
  }

  // 带 block 的 css 变量
  const cssVarBlockName = (name: string) => `--${globalNamespace}-${block}-${name}`

  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[cssVarBlockName(key)] = object[key]
    }
    return styles
  }

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,

    // css 变量
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

// useNamespace 返回值类型
export type UseNamespaceReturn = ReturnType<typeof useNamespace>
