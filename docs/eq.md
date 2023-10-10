## eq

eq 方法用于实现 [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) ，比较两个值是否相等。

```js
function eq(value, other) {
  return value === other || (value !== value && other !== other)
}
```

## (value !== value && other !== other) 是干什么的 ?

(value !== value && other !== other) 是一种用于检测 NaN（Not a Number）的常见方式。在 JavaScript 中，NaN 是一个特殊的数值，表示非数字的结果。

表达式 (value !== value) 用于检查 value 是否为 NaN。由于 NaN 与任何值都不相等（包括自身），因此当 value 是 NaN 时，表达式的结果为 true。

同样，表达式 (other !== other) 也用于检查 other 是否为 NaN。如果 other 是 NaN，则表达式的结果为 true。

整个表达式 (value !== value && other !== other) 的含义是：只有当 value 和 other 都是 NaN 时，结果才为 true。换句话说，如果 value 和 other 中至少有一个不是 NaN，那么结果将为 false。

这种检测方式通常用于排除 NaN 值，以确保进行数值计算或比较时的准确性。

## SameValue(x, y)

SameValue (x, y) 是一种内部比较抽象操作，其中 x 和 y 是 ECMAScript 语言的值，它产生 true 或 false 的结果。此类比较的执行如下：
- 如果 Type(x) 与 Type(y) 不同，返回 false。
- 如果 Type(x) 是 Number，那么
  - 如果 x 是 NaN 并且 y 是 NaN，则返回 true。
  - 如果 x 是 +0 并且 y 是 -0，则返回 false。
  - 如果 x 是 -0 并且 y 是 +0，则返回 false。
  - 如果 x 和 y 是相同的 Number 值，则返回 true。
  - 返回 false。
- 返回 SameValueNonNumber(x, y)。

> 注意：SameValueZero 在对待 +0 和 -0 时与 SameValue 不同。

## SameValueZero(x, y)

SameValueZero (x, y) （相同值零）是一种内部比较抽象操作，其中 x 和 y 是 ECMAScript 语言的值，它产生 true 或 false 的结果。此类比较的执行如下：
- 如果 Type(x) 与 Type(y) 不同，返回 false。
- 如果 Type(x) 是 Number，那么
  - 如果 x 是 NaN 并且 y 是 NaN，则返回 true。
  - 如果 x 是 +0 并且 y 是 -0，则返回 true。
  - 如果 x 是 -0 并且 y 是 +0，则返回 true。
  - 如果 x 和 y 是相同的 Number 值，则返回 true。
  - 返回 false。
- 返回 SameValueNonNumber(x, y)。

> 注意：SameValueZero 在对待 +0 和 -0 时与 SameValue 不同。

## SameValueNonNumber(x, y)

内部比较抽象操作 SameValueNonNumber(x, y) 是在 x 和 y 都不是 Number 类型的值时进行的，它产生 true 或 false 的结果。此类比较的执行如下：

- 断言：Type(x) 不是 Number。
- 断言：Type(x) 与 Type(y) 相同。
- 如果 Type(x) 是 Undefined，则返回 true。
- 如果 Type(x) 是 Null，则返回 true。
- 如果 Type(x) 是 String，则
    - 如果 x 和 y 是完全相同的代码单元序列（长度相同且对应索引处的代码单元相同），则返回 true；否则返回 false。
- 如果 Type(x) 是 Boolean，则
    - 如果 x 和 y 都为 true 或都为 false，则返回 true；否则返回 false。
- 如果 Type(x) 是 Symbol，则
    - 如果 x 和 y 都是相同的 Symbol 值，则返回 true；否则返回 false。
- 如果 x 和 y 是相同的 Object 值，则返回 true。否则返回 false。
