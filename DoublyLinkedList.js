// Doubly-Linked List
// 
// A Doubly-Linked List represents a sequence of Nodes 
// where each Node contains a value, a pointer to the 
// next Node in the List, and a pointer to the previous 
// Node in the List.
// 
// Unlike an Array, a Linked List doesn't provide random 
// access to the elements of the collection. That is, if 
// you'd like to access the Nth element in the List, you 
// need to iterate through all N elements.
// 
// The advantage of a Linked List is that adding and 
// removing elements from the beginning of a List is done 
// in constant time.
// 
// This implementation provides four operations to do with 
// a Linked List: insert, get, remove, and removeAll. 
// Other implementations are possible.
// 
// ┌───────┐     ┌───────┐     ┌────────┐     ┌───────┐     ┌───────┐
// │       │ ┌───│       │ ┌───│        │ ┌───│       │ ┌───│       │
// ├───────┤ │   ├───────┤ │   ├────────┤ │   ├───────┤ │   ├───────┤
// │   1   │◀┘ ┌▶│   5   │◀┘ ┌▶│   12   │◀┘ ┌▶│   7   │◀┘ ┌▶│   3   │
// ├───────┤   │ ├───────┤   │ ├────────┤   │ ├───────┤   │ ├───────┤
// │       │───┘ │       │───┘ │        │───┘ │       │───┘ │       │
// └───────┘     └───────┘     └────────┘     └───────┘     └───────┘
// 
// Additional resources: 
// - https://www.youtube.com/watch?v=zQI3FyWm144
// - https://www.youtube.com/watch?v=YQs6IC-vgmo


class DoublyLinkedListNode {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null
  }

  // Creates a new Node that contains the given value and 
  // inserts it at the beginning of the List. Returns 
  // the updated List.
  // 
  // - Complexity (Scalability): O(1).
  insert(value) {
    const node = new DoublyLinkedListNode(value)

    if (!this.head) {
      this.head = node
    } else {
      node.next = this.head
      this.head.prev = node
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

    let soughtNode = null
    let traversalNode = this.head

    while (traversalNode !== null) {
      if (traversalNode.value === value) {
        soughtNode = traversalNode
        return soughtNode
      }

      traversalNode = traversalNode.next
    }

    return null
  }

  // Removes and returns the Node that contains the sought 
  // value if one is found, otherwise returns null.
  // 
  // - Complexity (Scalability): O(n), where n is the length 
  //   of the List (lookup is O(n), removal is O(1)).
  remove(value) {
    if (!this.head) {
      return null
    }

    const soughtNode = this.get(value)
    
    if (soughtNode === null) {
      return null
    }

    const predecessorOfTheSoughtNode = soughtNode.prev
    const successorOfTheSoughtNode = soughtNode.next

    // First case is a special case for removing the head 
    // of the List. Second case is a special case for 
    // removing the tail of the List.
    if (soughtNode === this.head) {
      this.head = this.head.next
      this.head.prev = null
    } else if (soughtNode.next === null) {
      predecessorOfTheSoughtNode.next = null
    } else {
      predecessorOfTheSoughtNode.next = successorOfTheSoughtNode
      successorOfTheSoughtNode.prev = predecessorOfTheSoughtNode
    }
    
    return soughtNode
  }

  // Removes all Nodes from the List. Returns an empty List.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    if (this.head) {
      this.head = null
    }

    return this
  }
}