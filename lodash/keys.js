import isArrayLike from './isArrayLike.js'
/**
 *
 *  function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo)
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 */
function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
  // Object(object) 是为了处理 null和 undefined, 因为 Object(null) === Object(undefined) === {}
  // Object.keys(null) -> []
  // Object.keys('hi') -> ['0', '1']
}

export default keys
