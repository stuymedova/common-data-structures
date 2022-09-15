// Singly-Linked List
// 
// An unordered unidirectional collection, can only be 
// traversed forwards.
// 
// A Singly-Linked List represents a sequence of Nodes 
// where each Node contains a value, and a pointer to the 
// next Node in the List.
// 
// This implementation provides four operations to do with 
// a Linked List: insert, get, remove, and removeAll.
// Other implementations are possible.
// 
// ┌───────┐     ┌───────┐     ┌────────┐     ┌───────┐     ┌───────┐     
// │   1   │  ┌─▶│   5   │  ┌─▶│   12   │  ┌─▶│   7   │  ┌─▶│   3   │
// ├───────┤  │  ├───────┤  │  ├────────┤  │  ├───────┤  │  ├───────┤
// │       │──┘  │       │──┘  │        │──┘  │       │──┘  │       │
// └───────┘     └───────┘     └────────┘     └───────┘     └───────┘     
// 
// Additional resources: https://www.youtube.com/watch?v=zQI3FyWm144


class SinglyLinkedListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

export default class SinglyLinkedList {
  constructor() {
    this.head = null
  }

  // Returns a Node that contains a sought value if found, 
  // otherwise null.
  // 
  // - Complexity (Scalability): O(n), where n is the length 
  //   of the List.
  #find(value) {
    let traversalPointer = this.head

    while (traversalPointer !== null) {
      if (traversalPointer.value === value) {
        return traversalPointer
      }

      traversalPointer = traversalPointer.next
    }

    return null
  }

  // Returns a predecessor of the Node that contains a sought 
  // value if one is found, otherwise null.
  // 
  // - Complexity (Scalability): O(n), where n is the length 
  //   of the List.
  #findPredecessorOf(value) {
    // Implementation uses the "runner" technique
    let fastTraversalPointer = this.head
    let slowTraversalPointer = null

    while (fastTraversalPointer !== null) {
      if (fastTraversalPointer.value === value) {
        return slowTraversalPointer
      }

      slowTraversalPointer = fastTraversalPointer
      fastTraversalPointer = fastTraversalPointer.next
    }

    return null
  }

  // Creates a new Node that contains a given value and 
  // inserts it in the beginning of the List. Returns 
  // an updated List.
  // 
  // - Complexity (Scalability): O(1)
  insert(value) {
    const node = new SinglyLinkedListNode(value)

    if (!this.head) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }

    return this
  }

  // Returns the Node that contains the sought value if such 
  // is found, otherwise null.
  // 
  // - Complexity (Scalability): O(n), where n is the length 
  //   of the List.
  get(value) {
    if (!this.head) {
      return null
    }

    const soughtNode = this.#find(value)
    return soughtNode
  }

  // Removes the Node that contains the sought value from 
  // the List. Returns an updated List.
  // 
  // - Complexity (Scalability): O(n), where n is the length 
  //   of the List.
  remove(value) {
    if (!this.head) {
      return null
    }

    // Special case for removing the head of the List
    if (this.head.value === value) {
      this.head = this.head.next
      return this
    }

    const predecessorOfTheSoughtNode = this.#findPredecessorOf(value)
    const soughtNode = predecessorOfTheSoughtNode?.next

    // First case is the special case for removing the tail 
    // of the List
    if (predecessorOfTheSoughtNode && soughtNode.next === null) {
      predecessorOfTheSoughtNode.next = null
    } else if (predecessorOfTheSoughtNode) {
      predecessorOfTheSoughtNode.next = soughtNode.next
    }

    return this
  }

  // Removes all Nodes from the List. Returns an empty List.
  // 
  // - Complexity (Scalability): O(1)
  removeAll() {
    if (this.head) {
      this.head = null
    }

    return this
  }
}