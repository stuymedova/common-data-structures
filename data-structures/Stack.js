// Stack
//
// A data structure that conforms to the LIFO (last in,
// first out) rule, meaning that the last item added is
// the first one to be removed.
//
// This implementation provides five operations to do with
// a Stack: push, isEmpty, peek, pop, and clear. Other
// implementations are possible.
//
//   │   ▲
//   ▼   │
// ┌───────┐
// │   1   │
// ├───────┤
// │   5   │
// ├───────┤
// │   7   │
// ├───────┤
// │   3   │
// └───────┘
//
// Additional resources:
// - https://www.youtube.com/watch?v=hVsNqhEthOk


export default class Stack {
  constructor() {
    this.values = []
    return this
  }

  // Adds a new item to the top of the Stack. Returns the
  // updated Stack.
  //
  // - Complexity (Scalability): O(1) on average.
  push(value) {
    this.values.push(value)
    return this
  }

  // Returns true if the Stack is empty, otherwise false.
  //
  // - Complexity (Scalability): O(1).
  isEmpty() {
    return (this.values.length === 0)
  }

  // Returns the item at the top of the Stack.
  //
  // - Complexity (Scalability): O(1).
  peek() {
    return !this.isEmpty() ? this.values[this.values.length - 1] : null
  }

  // Removes the most recently-added item from the top of
  // the Stack. Returns the removed item.
  //
  // - Complexity (Scalability): O(1).
  pop() {
    const removedItem = this.values.pop()
    return removedItem
  }

  // Removes all items from the Stack. Returns an empty
  // Stack.
  //
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.values = []
    return this
  }
}
