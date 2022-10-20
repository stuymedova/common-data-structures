// Stack
// 
// A data structure that conforms to the LIFO (last in, 
// first out) rule, meaning that the last element added 
// is the first one to be removed.
// 
// This implementation provides four operations to do with 
// a Stack: push, pop, isEmpty, and peek. Other 
// implementations are possible.
// 
//    │   ▲
//    ▼   │
// ┌─────────┐
// │    7    │
// ├─────────┤
// │   12    │
// ├─────────┤
// │    5    │
// ├─────────┤
// │    1    │
// └─────────┘
// 
// Additional resources: 
// - https://www.youtube.com/watch?v=hVsNqhEthOk


export default class Stack {
  constructor() {
    this.items = []
  }

  // Adds a new element to the top of the Stack. Returns 
  // the Stack.
  // 
  // - Complexity (Scalability): O(1), occasionally O(n),
  //   where n is the length of the Stack.
  push(value) {
    this.items.push(value)
    return this
  }

  // Removes the most recently-added element from the top 
  // of the Stack. Returns the removed element.
  // 
  // - Complexity (Scalability): O(1).
  pop() {
    const removedItem = this.items.pop()
    return removedItem
  }

  // Returns true if the Stack is empty, otherwise false.
  // 
  // - Complexity (Scalability): O(1).
  isEmpty() {
    return (this.items.length === 0)
  }

  // Returns the top of the Stack.
  // 
  // - Complexity (Scalability): O(1).
  peek() {
    return !this.isEmpty() ? this.items[this.items.length - 1] : null
  }
}