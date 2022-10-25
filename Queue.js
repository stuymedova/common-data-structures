// Queue
// 
// A data structure that conforms to the FIFO (first in, 
// first out) rule, meaning that the first item added is 
// the first one to be removed.
// 
// This implementation provides four operations to do with 
// a Queue: add, remove, isEmpty, and peek. Other 
// implementations are possible.
// 
//     ┌───────┬───────┬────────┬───────┬───────┐     
// ───▶│   1   │   5   │   12   │   7   │   3   │───▶
//     └───────┴───────┴────────┴───────┴───────┘ 
// 
// Additional resources: 
// - https://www.youtube.com/watch?v=3TmUv1uS92s


export default class Queue {
  constructor() {
    this.queue = []
  }

  // Adds a new item to the end of the Queue. Returns the 
  // updated Queue.
  // 
  // - Complexity (Scalability): O(1), occasionally O(n),
  //   where n is the length of the Queue.
  add(value) {
    this.queue.push(value)
    return this
  }

  // Removes the first-added item from the front of the 
  // Queue. Returns the removed item.
  // 
  // - Complexity (Scalability): O(n), where n is the 
  //   length of the Queue.
  remove() {
    const removedItem = this.queue.shift(1)
    return removedItem
  }

  // Returns true if the Queue is empty, otherwise false.
  // 
  // - Complexity (Scalability): O(1).
  isEmpty() {
    return (this.queue.length === 0)
  }

  // Returns the item at the front of the Queue.
  // 
  // - Complexity (Scalability): O(1).
  peek() {
    return !this.isEmpty() ? this.queue[0] : null
  }
}