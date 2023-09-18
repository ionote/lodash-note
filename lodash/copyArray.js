function copyArray(source, array) {
  let index = -1
  const length = source.length

  // 如果没有 array, 新建一个 length 长度的数组
  array || (array = new Array(length))

  while (++index < length) {
    array[index] = source[index]
  }
  return array
}

export default copyArray
