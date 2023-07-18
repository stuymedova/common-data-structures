// Queue
//
// A data structure that conforms to the FIFO (first in,
// first out) rule, meaning that the first item added is
// the first one to be removed.
//
// This implementation provides five operations to do with
// a Queue: add, isEmpty, peek, remove, and removeAll.
// Other implementations are possible.
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
    return this
  }

  // Adds a new item to the end of the Queue. Returns the
  // updated Queue.
  //
  // - Complexity (Scalability): O(1) on average.
  add(value) {
    this.queue.push(value)
    return this
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

  // Removes the first-added item from the front of the
  // Queue. Returns the removed item.
  //
  // - Complexity (Scalability): O(n), where n is the
  //   length of the Queue.
  remove() {
    const removedItem = this.queue.shift()
    return removedItem
  }

  // Removes all items from the Queue. Returns an empty
  // Queue.
  //
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.queue = []
    return this
  }
}