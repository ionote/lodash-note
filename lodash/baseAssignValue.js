// 赋值
function baseAssignValue(object, key, value) {
  // 如果 key 是 __proto__，就用 Object.defineProperty 定义
  if (key === '__proto__') {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    })
  } else {
    // 否则直接赋值
    object[key] = value
  }
}

export default baseAssignValue
