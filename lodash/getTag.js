const toString = Object.prototype.toString

function getTag(value) {
  // 下面这个判断是为了兼容 ie11, 因为 ie11 下，typeof null 和 undefined 都是 'object'
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }

  return toString.call(value)
}

export default getTag
