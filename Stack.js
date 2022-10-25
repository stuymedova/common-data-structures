// Stack
// 
// A data structure that conforms to the LIFO (last in, 
// first out) rule, meaning that the last item added is 
// the first one to be removed.
// 
// This implementation provides four operations to do with 
// a Stack: push, pop, isEmpty, and peek. Other 
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
    this.stack = []
  }

  // Adds a new item to the top of the Stack. Returns the 
  // updated Stack.
  // 
  // - Complexity (Scalability): O(1), occasionally O(n),
  //   where n is the length of the Stack.
  push(value) {
    this.stack.push(value)
    return this
  }

  // Removes the most recently-added item from the top of 
  // the Stack. Returns the removed item.
  // 
  // - Complexity (Scalability): O(1).
  pop() {
    const removedItem = this.stack.pop()
    return removedItem
  }

  // Returns true if the Stack is empty, otherwise false.
  // 
  // - Complexity (Scalability): O(1).
  isEmpty() {
    return (this.stack.length === 0)
  }

  // Returns the item at the top of the Stack.
  // 
  // - Complexity (Scalability): O(1).
  peek() {
    return !this.isEmpty() ? this.stack[this.stack.length - 1] : null
  }
}