// Binary Min Heap
// 
// A Binary Min Heap is a complete binary tree where each 
// Node is smaller than its children. Thus the root is the 
// smallest element in the Heap.
// 
// A Heap is really good at basic ordering and keeping 
// track of max and min elements.
// 
// This implementation provides four operations to do 
// with a Heap: insert, peek, extractMin, and removeAll. 
// Other implementations are possible.
// 
//                   ┌───────┐
//                   │   1   │
//                   └─┬───┬─┘
//            ┌────────┘   └────────┐
//        ┌───┴───┐             ┌───┴───┐
//        │   3   │             │   2   │
//        └─┬───┬─┘             └─┬─────┘
//      ┌───┘   └───┐         ┌───┘
//  ┌───┴───┐   ┌───┴───┐ ┌───┴────┐
//  │   7   │   │   5   │ │   12   │
//  └───────┘   └───────┘ └────────┘
// 
// Additional resources:
// - https://www.youtube.com/watch?v=t0Cq6tVNRBA
// - https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/heap


export default class BinaryMinHeap {
  constructor() {
    this.items = []
    return this
  }

  // Returns the supposed position of the left child based 
  // on the given position of its parent.
  // 
  // - Complexity (Scalability): O(1).
  #getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  // Returns the supposed position of the right child based 
  // on the given position of its parent.
  // 
  // - Complexity (Scalability): O(1).
  #getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  // Returns the supposed position of the parent item based 
  // on the given position of one of its children.
  // 
  // - Complexity (Scalability): O(1).
  #getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  // Returns true if the element at the given position has a 
  // left child, otherwise returns false.
  // 
  // - Complexity (Scalability): O(1).
  #hasLeftChild(parentIndex) {
    return this.#getLeftChildIndex(parentIndex) < this.items.length
  }

  // Returns true if the element at the given position has a 
  // right child, otherwise returns false.
  // 
  // - Complexity (Scalability): O(1).
  #hasRightChild(parentIndex) {
    return this.#getRightChildIndex(parentIndex) < this.items.length
  }

  // Returns true if the element at the given position has a 
  // parent, otherwise returns false.
  // 
  // - Complexity (Scalability): O(1).
  #hasParent(childIndex) {
    return this.#getParentIndex(childIndex) >= 0
  }

  // Returns the left child of the item at the given index 
  // if such child exists, otherwise returns null.
  // 
  // - Complexity (Scalability): O(1).
  #getLeftChild(parentIndex) {
    if (this.#hasLeftChild(parentIndex)) {
      return this.items[this.#getLeftChildIndex(parentIndex)]
    }
    return null
  }

  // Returns the right child of the item at the given index 
  // if such child exists, otherwise returns null.
  // 
  // - Complexity (Scalability): O(1).
  #getRightChild(parentIndex) {
    if (this.#hasRightChild(parentIndex)) {
      return this.items[this.#getRightChildIndex(parentIndex)]
    }
    return null
  }

  // Returns the parent of the item at the given position 
  // if such parent exists, otherwise returns null.
  // 
  // - Complexity (Scalability): O(1).
  #getParent(childIndex) {
    if (this.#hasParent(childIndex)) {
      return this.items[this.#getParentIndex(childIndex)]
    }
    return null
  }

  // Swaps in place items at the given indexes, returns 
  // the items array.
  // 
  // - Complexity (Scalability): O(1).
  #swapItemsAt(i, j) {
    const temporaryI = this.items[i]
    this.items[i] = this.items[j]
    this.items[j] = temporaryI

    return this.items
  }

  // Rebalances the Heap from the last element (bottom) up. 
  // Returns the Heap.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of items in the Heap.
  #bubbleUp() {
    let index = this.items.length - 1

    while (this.#hasParent(index) && 
          (this.#getParent(index) > this.items[index])) {
      const parentIndex = this.#getParentIndex(index)

      this.#swapItemsAt(parentIndex, index)
      index = parentIndex
    }

    return this
  }

  // Rebalances the Heap from the first element (top) down. 
  // Returns the Heap.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of items in the Heap.
  #bubbleDown() {
    let index = 0

    while (this.#hasLeftChild(index)) {
      let indexOfASmallerChild = this.#getLeftChildIndex(index)
      if (this.#hasRightChild(index) && 
         (this.#getRightChild(index) < this.#getLeftChild(index))) {
        indexOfASmallerChild = this.#getRightChildIndex(index)
      }

      if (this.items[index] < indexOfASmallerChild) {
        break
      }

      this.#swapItemsAt(index, indexOfASmallerChild)
      index = indexOfASmallerChild 
    }

    return this
  }

  // Inserts a new item at the end of the Heap, then 
  // rebalances the Heap. Returns the Heap.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of items in the Heap.
  insert(item) {
    this.items.push(item)
    this.#bubbleUp()

    return this
  }

  // Returns the item at the top of the Heap.
  // 
  // - Complexity (Scalability): O(1).
  peek() {
    if (this.items.length === 0) {
      return null
    }

    return this.items[0]
  }

  // Extracts the first (min) item from the Heap, then 
  // rebalances the Heap. Returns the first (min) item.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of items in the Heap.
  extractMin() {
    if (this.items.length === 0) {
      return null
    }

    const item = this.items[0]

    this.items[0] = this.items.pop()
    this.#bubbleDown() 

    return item
  }

  // Removes all Nodes from the Heap. Returns an empty Heap.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.items = []
    return this
  }
}