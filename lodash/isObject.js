// 对象类型判断：
// 1. typeof null === 'object' 排除
// 2. typeof function === 'object'
// 3. typeof object === 'object'
function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export default isObject
