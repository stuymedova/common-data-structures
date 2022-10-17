// Queue
// 
// A data structure that conforms to the FIFO (first in, 
// first out) rule, meaning that the first element added 
// is the first one to be removed.
// 
// This implementation provides four operations to do with 
// a Queue: add, remove, isEmpty, and peek. Other 
// implementations are possible.
// 
//     ┌───────┬───────┬────────┬───────┬───────┐     
// ───▶│   3   │   7   │   12   │   5   │   1   │───▶
//     └───────┴───────┴────────┴───────┴───────┘ 
// 
// Additional resources: 
// - https://www.youtube.com/watch?v=3TmUv1uS92s


export default class Queue {
  constructor() {
    this.items = []
  }

  // Adds a new element to the end of the Queue. Returns
  // the Queue.
  add(value) {
    this.items.push(value)
    return this
  }

  // Removes the first-added element from the front of the 
  // Queue. Returns the removed element.
  remove() {
    const removedItem = this.items.shift(1)
    return removedItem
  }

  // Returns true if the Queue is empty, otherwise false.
  isEmpty() {
    return (this.items.length === 0)
  }

  // Returns an element at the front of the Queue.
  peek() {
    return !this.isEmpty() ? this.items[0] : null
  }
}