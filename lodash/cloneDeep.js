import baseClone from './.internal/baseClone'

const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4
/**
 * 深拷贝
 * @param {*} value
 */
function cloneDeep(value) {
  // | 或运算符, 两个位都为0时，结果才为0, 否则为1
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}

// ^ 异或运算符, 两个操作数的位中，相同则结果为0，不同则结果为1
// ~ 非运算符, 用于对一个二进制数按位取反
// const a = 5; // 00000000000000000000000000000101
// const b = -3; // 11111111111111111111111111111101

// console.log(~a); // 11111111111111111111111111111010
// // Expected output: -6

// console.log(~b); // 00000000000000000000000000000010
// // Expected output: 2

export default cloneDeep
