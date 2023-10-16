# clone 方法的实现

要实现 clone 方法, 需要知道：

1. 浅拷贝、深拷贝的概念
2. 克隆的数据类型有哪些
3. 如何判断数据类型
4. 如何创建一个与原对象类型相同的对象
5. baseClone
## 克隆的数据类型有哪些

首先，我们需要知道，JavaScript 规定了八种数据类型：

1. 基本数据类型：`Number`、`String`、`Boolean`、`Symbol`、`Undefined`、`Null`、`BigInt`
2. 引用数据类型：`Object`

而引用类型又包含很多：

- 包装类型 Number、String、Boolean
- Object
- Array、Arguments
- Function
- RegExp、Date
- Map、Set、WeakMap、WeakSet
- ...

来看看 lodash 克隆了哪些引用类型：

```js
/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

// 一些我还不知道的类型
const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'
```

## 如何判断数据类型

常用的判断数据类型的方法有：

- typeof 运算符, 可以判断基本数据类型, 但是对于引用类型, 除了 function 之外, 都会返回 object(包括 null)
- instanceof 运算符, 可以判断引用类型, 但是不能判断基本数据类型, 另外, 对于引用类型, 不能跨 frame/iframe 检测
- Object.prototype.toString.call() 方法, 可以判断所有类型, 但是需要注意的是, 不能直接使用 toString.call() 方法, 因为这样会返回 [object global], 而不是我们想要的结果

## 如何创建一个与原对象类型相同的对象

对于基本数据类型, 我们可以直接使用 = 就可以创建一个类型和值相同的对象, 例如:

```js
// 拷贝 number, string, boolean, symbol, undefined, null, bigint
let a = 1
let cloneA = a

let symbol1 = Symbol('symbol1')
let cloneSymbol1 = symbol1
typeof cloneSymbol1 // 'symbol'

let bigInt1 = BigInt(1)
let cloneBigInt1 = bigInt1
```

对于引用类型, 我们可以使用构造函数来创建一个类型相同的对象, 例如:

```js
// 拷贝 object, array, function, regexp, date, map, set, weakMap, weakSet
let obj = { a: 1 }
const Ctor = obj.constructor
let cloneObj = new Ctor()

let arr = [1, 2, 3]
const Ctor = arr.constructor
let cloneArr = new Ctor()

let fn = function () {}
const Ctor = fn.constructor
let cloneFn = new Ctor()

let reg = /a/
const Ctor = reg.constructor
let cloneReg = new Ctor()
```

来看看 lodash 是如何实现的:

```js
function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor

  switch (tag) {
    // ...

    case boolTag:
    case dateTag:
      return new Ctor(+object) // +object 会将 object 转换为数字

    // ...

    case mapTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor

    case symbolTag:
      return cloneSymbol(object)
  }
}
```

对于包装类型和 date, 会在创建对象时，直接赋值。对于其他类型，会先创建一个空对象，后续然后再进行深拷贝。

cloneSymbol 的实现:

```js
/** Used to convert symbols to primitives and strings. */
const symbolValueOf = Symbol.prototype.valueOf

function cloneSymbol(symbol) {
  return Object(symbolValueOf.call(symbol))
}
```

为什么不直接用 Symbol(symbol) 呢, 因为 Symbol(symbol) 会创建一个新的 symbol, 而我们需要的是一个和原 symbol 相同的 symbol。

cloneRegExp 的实现:

```js
const reFlags = /\w*$/

function cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}
```

下面是一个正则对象:

![](imgs/2023-10-14-14-43-23.png)

new RegExp(source, flags) 会创建一个正则表达式, source 是正则表达式的字符串形式, flags 是正则表达式的标志, 例如 g、i、m 等。

flags 可以是字符串, 如 'gi'。也可以是数组, 如 ['gi']。

```js
new RegExp('a', 'gi')
new RegExp('a', ['gi'])
```

exec() 的参数可以是字符串, 也可以是正则表达式。如果没有匹配到, 返回值为 null, 否则返回一个包含匹配结果的数组。

```js
/\w*$/.exec(/a/gi)
/\w*$/.exec('/a/gi')

// 结果是 ['gi', index: 2, input: '/a/g', groups: undefined, length: 1]
```

最后要注意的是, lastIndex 属性, 它是一个可读写的整数, 用来指定下一次匹配的起始索引。当 exec 或 test 方法被调用时, 它会被自动更新。

```js
const reg = /a/gi
reg.lastIndex = 1
reg.exec('abc') // null
reg.lastIndex // 0
reg.exec('abc') // ['a', index: 0, input: 'abc', groups: undefined, length: 1]
reg.lastIndex // 1

// 分组
/(a)/gi.exec('abc') // ['a', 'a', index: 0, input: 'abc', groups: undefined, length: 2]
```

groups 是一个新的field，用来存储命名捕获组的信息：

```js
let reg1 = /(\d)(\d)/
let str1 = '123'

console.log(reg1.exec(str1)) // => [12, 1, 2] 除去第一个以外的其他数据就是分组捕获到的数据，但是因为是一个数组，所以会存在一个记忆成本

// 命名捕获组的获取
let reg1 = /(?<first>\d)(?<second>\d)/
let str2 = '123'

console.log(reg2.exec(str2).groups) // => { first: 1, second: 2 } 而新的语法支持对这些捕获组进行命名，更方便地获取某个捕获组的数据
```

## 第一版

支持浅拷贝、深拷贝，支持循环引用。


```js
function baseClone(value, isDeep, stack) {
  let result

  // 基本类型
  if(!isObject(value)) {
    return value
  }

  // 引用类型
  const isArr = Array.isArray(value)
  if(isArr) {
    result = []
  } else {
    result = {}
  }

  // 解决循环引用
  stack = stack || []
  if(stack.includes(value)) {
    return result
  }
  stack.push(value)

  // 拷贝
  for(let key in value) {
    if(value.hasOwnProperty(key)) {
      if(isDeep) {
        result[key] = baseClone(value[key], isDeep)
      } else {
        result[key] = value[key]
      }
    }
  }
}

function isObject() {
  return typeof value === 'object' && value !== null
}
```

## baseClone 方法

lodash 中 baseClone 方法是 clone 方法的核心方法, 它的实现如下:

```js
function baseClone(value, bitmask, customizer, key, object, stack) {
  ...
}
```

参数说明:

- value: 要克隆的值
- bitmask: 位掩码, 用来指定克隆的方式, 包含以下几种:
  - CLONE_DEEP_FLAG: 深拷贝
  - CLONE_FLAT_FLAG: 拷贝扁平化的数组
  - CLONE_SYMBOLS_FLAG: 拷贝 symbol
  - CLONE_UNSAFE_FLAT_FLAG: 拷贝扁平化的数组, 不安全
- customizer: 自定义克隆函数
- key: 当前克隆的 key
- object: value 的父对象
- stack: 用来存储已经克隆过的对象, 防止循环引用

baseClone 内部实现步骤:

1. 定义一些变量
2. 如果自定义了克隆函数, 则直接调用自定义函数
3. 如果是基础类型(非 object、function), 则直接返回
4. 如果是引用类型, 则根据引用类型的不同, 调用 initCloneObject 不同的方法初始化 result 变量。这里 RegExp、Object(1), Object(symbole) 等会被拷贝。也会克隆函数。
5. 用 stack 解决循环引用
6. 克隆 Map、Set
7. 遍历对象和数组, 递归调用 baseClone 方法, 拷贝对象和数组的每一项。


克隆函数?

lodash 中的函数克隆, 只是直接返回一个 {} 对象，如果对象属性是函数, 会直接返回这个函数。

```js
const cloneableTags = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true

cloneableTags[errorTag] = cloneableTags[weakMapTag] = false
if (isFunc || !cloneableTags[tag]) {
  return object ? value : {}
}
```


## 更多资料

- [如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)
- https://juejin.cn/post/6956794126528413704
- http://jartto.wang/2018/11/20/js-exception-handling/
- https://github.com/rico-c/Front-End-Monitoring/blob/master/badjs-sourcedoce-explain.md
