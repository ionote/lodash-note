import isObject from '../isObject.js'
import copyArray from '../copyArray.js'
import keys from '../keys.js'
import getAllKeys from '../getAllKeys.js'
import arrayEach from '../arrayEach.js'
import assignValue from '../assignValue.js'
import copySymbols from '../copySymbols.js'

const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4 // 是否克隆symbol

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

function getTag(value) {
  return Object.prototype.toString.call(value)
}

function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor
  switch (tag) {
    case mapTag:
      return new Ctor()
    case setTag:
      return new Ctor()
  }
}

function initCloneArray(array) {
  const { length } = array
  // 可能是为了放置 iframe 的情况
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  /**
   * /a/.exec('ha') -> [ "a", index: 1, input:'ha', groups: undefined, length: 1 ]
   * /a/.exec('h') -> null
   */
  if (
    length &&
    typeof array[0] === 'string' &&
    Object.prototype.hasOwnProperty.call(array, 'index')
  ) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

function baseClone(value, bitmask, customizer, key, object, stack) {
  let result

  // & 与运算符, 两个位都为1时，结果才为1, 否则为0
  const isFull = bitmask & CLONE_SYMBOLS_FLAG // 是否克隆symbol
  const isDeep = bitmask & CLONE_DEEP_FLAG // 是否深拷贝

  // 基础类型直接返回
  if (!isObject(value)) {
    return value
  }

  const isArr = Array.isArray(value) // 是否是数组
  const tag = getTag(value)
  if (isArr) {
    result = initCloneArray(value)
    if (!isDeep) {
      return copyArray(value, result)
    }
  } else {
    const isFunc = typeof value === 'function' // 是否是函数

    if (tag === objectTag) {
      result = {}

      if (!isDeep) {
        return copySymbols(value, Object.assign(result, value))
      }
    } else {
      result = initCloneByTag(value, tag, isDeep)
    }
  }

  // 如果是 Map
  if (tag === mapTag) {
    value.forEach((subValue, key) => {
      result.set(
        key,
        baseClone(subValue, bitmask, customizer, key, value, stack)
      )
    })
    return result
  }

  // 如果是 Set
  if (tag === setTag) {
    value.forEach((subValue) => {
      result.add(
        baseClone(subValue, bitmask, customizer, subValue, value, stack)
      )
    })
    return result
  }

  const keysFunc = isFull ? getAllKeys : keys

  const props = isArr ? undefined : keysFunc(value)
  // 对象或者数组
  arrayEach(props || value, (subValue, key) => {
    // 有 props, 表示 value 是对象, 这里做兼容处理
    if (props) {
      key = subValue
      subValue = value[key]
    }

    // 递归赋值
    assignValue(result, key, baseClone(subValue, bitmask))
  })

  return result
}

export default baseClone
