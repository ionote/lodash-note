/**
 * lodash 为什么有 ListCache 而不只用 对象哈希缓存?
lodash 之所以使用 ListCache 而不仅仅使用对象哈希缓存，是因为 ListCache 提供了一种更适合存储有序数据的数据结构。

ListCache 是 lodash 内部使用的一种缓存结构，它是一个类似于数组的数据结构，可以按照插入顺序存储键值对。相比之下，对象哈希缓存是使用对象的哈希值作为键来存储数据，它并不保留插入顺序。

在某些情况下，有序数据的顺序是非常重要的，特别是当需要按照插入顺序进行迭代或获取最近插入的数据时。ListCache 提供了这种有序存储的能力，因此在 lodash 中被广泛使用。

另外，ListCache 还提供了一些额外的功能，例如可以限制缓存的大小，当缓存达到一定大小时，可以自动删除最旧的数据。这对于控制缓存大小和优化性能非常有帮助。

综上所述，lodash 选择使用 ListCache 而不仅仅使用对象哈希缓存是为了提供更适合有序数据存储和额外功能的数据结构。
 */
class ListCache {
  // [key, value] ->
  constructor(entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  clear() {
    this.__data__ = []
    this.size = 0
  }

  // 删除指定的key
  delete(key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
      return false
    }

    // 如果找到了，就删除
    const lastIndex = data.length - 1
    // 如果是最后一个元素，就直接 pop, 这是因为 splice 会重新分配内存, 会影响性能
    if (index === lastIndex) {
      data.pop()
    } else {
      data.splice(index, 1)
    }
    --this.size
    return true
  }

  get(key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)
    return index < 0 ? undefined : data[index][1]
  }

  has(key) {
    return assocIndexOf(this.__data__, key) > -1
  }

  set(key, value) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    // 如果没有找到，就 push 进去
    if (index < 0) {
      ++this.size
      data.push([key, value])
    } else {
      // 否则就更新值
      data[index][1] = value
    }
  }
}

export default ListCache
