/**
 * 查找数组中是否存在指定的key，返回索引值
 * @param {*} array
 * @param {*} key
 * @returns {number} 返回索引值
 */
export default function assocIndexOf(array, key) {
  let { length } = array
  while (length--) {
    if (array[length][0] === key) {
      return length
    }
  }
  return -1
}
