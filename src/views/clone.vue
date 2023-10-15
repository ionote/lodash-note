<template>
  <div></div>
</template>

<script setup lang="ts">
import clone from '@banli17/lodash/clone'
import _ from 'lodash'

const symbol1 = Symbol('symbol1')
const symbol2 = clone(symbol1)
console.log(symbol1 === symbol2) // true

const p1 = {
  name: 'p1',
  age: 18,
  children: [
    {
      name: 'c1',
      age: 1,
    },
    {
      name: 'c2',
      age: 2,
    },
  ],
}
const p2 = clone(p1)
console.log(`-----------clone object---------`)
console.log('p2', p2)
console.log('p1.children === p2.children：', p1.children === p2.children) // true

console.log(`------------clone array ---------`)
const arr1 = [1, 2, 3, 4, 5]
const arr2 = clone(arr1)
console.log('arr2', arr2)

const sayA = function () {
  console.log('a')
}
console.log('clone function', _.clone(sayA), _.clone(sayA) === sayA) // false
</script>
