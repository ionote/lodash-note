/**
 * 比较两个值是否相等, 类型相同, 值相等, NaN 相等
 * @param {*} value
 * @param {*} other
 * @returns
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other)
}

export default eq
