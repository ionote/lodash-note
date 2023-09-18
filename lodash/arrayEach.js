/**
 * 遍历数组
 * @param {*} array
 * @param {*} iteratee
 * @returns
 */
function arrayEach(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      // 如果返回 false, 则中断循环
      break
    }
  }
  return array
}

export default arrayEach
