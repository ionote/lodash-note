import keys from './keys.js'
import getSymbols from './getSymbols.js'
function getAllKeys(object) {
  const result = keys(object)
  if (!Array.isArray(object)) {
    // 如果不是数组, 就把 symbol 的 key 合并进去
    result.push(...getSymbols(object))
  }
  return result
}

export default getAllKeys
