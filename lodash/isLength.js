// 这段代码用作各种 Number 常量的参考
const MAX_SAFE_INTEGER = 9007199254740991

function isLength(value) {
  return (
    typeof value == 'number' &&
    value > -1 &&
    value % 1 == 0 && // 判断是否为整数
    value <= MAX_SAFE_INTEGER
  )
}

export default isLength
