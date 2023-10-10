## ListCache

## 为什么要 ListCache 而不用 {} 缓存

lodash 之所以使用 ListCache 而不仅仅使用对象哈希缓存，是因为 ListCache 提供了一种更适合存储有序数据的数据结构。

ListCache 是 lodash 内部使用的一种缓存结构，它是一个类似于数组的数据结构，可以按照插入顺序存储键值对。相比之下，对象哈希缓存是使用对象的哈希值作为键来存储数据，它并不保留插入顺序。

在某些情况下，有序数据的顺序是非常重要的，特别是当需要按照插入顺序进行迭代或获取最近插入的数据时。ListCache 提供了这种有序存储的能力，因此在 lodash 中被广泛使用。

另外，ListCache 还提供了一些额外的功能，例如可以限制缓存的大小，当缓存达到一定大小时，可以自动删除最旧的数据。这对于控制缓存大小和优化性能非常有帮助。

综上所述，lodash 选择使用 ListCache 而不仅仅使用对象哈希缓存是为了提供更适合有序数据存储和额外功能的数据结构。