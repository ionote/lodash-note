import baseAssignValue from './baseAssignValue.js'
import eq from './eq.js'

const hasOwnProperty = Object.prototype.hasOwnProperty

function assignValue(object, key, value) {
  const objValue = object[key]

  // 非 自身属性，且值相等
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    // 用来区分 +0 和 -0, 因为 +0 === -0, 但是 1 / +0 === Infinity, 1 / -0 === -Infinity
    // 如果 value= 0, objValue = -0, 或者 value = -0, objValue = 0, 那么就不会赋值
    if (value !== 0 || 1 / value === 1 / objValue) {
      baseAssignValue(object, key, value)
    }
  } else if (value === undefined && !(key in object)) {
    // 如果 value 是 undefined 且 key 不在 object 上, 也就是说 key 是 object 的原型属性
    baseAssignValue(object, key, value)
  }
}

export default assignValue
