<template>
  <div></div>
</template>

<script setup lang="ts">
import cloneDeep from '@banli17/lodash/cloneDeep'

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
const p2 = cloneDeep(p1)

console.log(`p2:`, p2)

console.log(`p1.children === p2.children`, p1.children === p2.children) // false

console.log(
  `p1.children[0] === p2.children[0]`,
  p1.children[0] === p2.children[0]
) // false
</script>
