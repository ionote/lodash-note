const propertyIsEnumerable = Object.prototype.propertyIsEnumerable
// 获取对象的symbol属性
const nativeGetSymbols = Object.getOwnPropertySymbols

/**
 * 获取对象的symbol属性列表
 * @returns []
 */
function getSymbols(object) {
  if (object == null) {
    return []
  }
  object = Object(object)
  return nativeGetSymbols(object).filter((symbol) => {
    // 过滤掉不可枚举的symbol属性
    return propertyIsEnumerable.call(object, symbol)
  })
}

export default getSymbols
