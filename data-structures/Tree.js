// Tree
// 
// A Tree is an instance of a Graph where each node can 
// have several children, but must have exactly one 
// parent, except for the root node, which has no parent. 
// And as such, a tree cannot contain cycles.
// 
// This implementation provides four operations to do with 
// a Tree: insert (for the root node and its immediate 
// children), get, remove, and removeAll; and one 
// operation to do with a Tree Node: insert. Other 
// implementations are possible.
// 
//                     ┌───────┐
//                     │   3   │
//                     └─┬─┬─┬─┘
//              ┌────────┘ │ └────────┐
//          ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
//          │   7   │  │   5   │  │   1   │
//          └─┬───┬─┘  └───────┘  └───┬───┘
//       ┌────┘   └───┐               │
//  ┌────┴───┐    ┌───┴───┐       ┌───┴───┐
//  │   12   │    │   2   │       │   6   │
//  └────────┘    └───────┘       └───────┘
// 
// Additional resources:
// - https://en.wikipedia.org/wiki/Tree_traversal


import { Queue } from '../mod.js'

class Node {
  constructor(value) {
    this.value = value
    this.children = []
  }

  // Creates a new Node that contains the given value and 
  // inserts it as the given Node's immediate child. Returns 
  // the given Node.
  // 
  // - Complexity (Scalability): O(1) on average.
  insert(value) {
    const node = new Node(value)
    this.children.push(node)
    
    return this
  }
}

export default class Tree {
  constructor() {
    this.root = null
  }

  // Returns the parent of the Node that contains the sought 
  // value if one is found, otherwise null.
  // 
  // - Note: uses a Breadth-First Search algorithm.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of Nodes in the Tree.
  #getParentOf(value) {
    if (!this.root) {
      return null
    } else if (this.root.value === value) {
      return null
    }

    const queue = new Queue()
    queue.add(this.root)

    while (!queue.isEmpty()) {
      const currentNode = queue.remove()

      for (const child of currentNode.children) {
        if (child.value === value) {
          return currentNode
        }

        queue.add(child)
      }
    }

    return null
  }

  // Creates a new Node that contains the given value and 
  // inserts it at the root if the root element doesn't 
  // already exist, otherwise inserts it as the immediate 
  // child of the root. Returns the updated Tree.
  // 
  // - Note: for attaching children to any other Node (other 
  // than the root), use the insert function provided by the 
  // Node class. For instance, 
  // `tree.get(7).insert(12).insert(2)`.
  // 
  // - Complexity (Scalability): O(1) on average.
  insert(value) {
    const node = new Node(value)

    if (!this.root) {
      this.root = node
    } else {
      this.root.children.push(node)
    }
    
    return this
  }

  // Returns the Node that contains the sought value if such 
  // is found, otherwise null.
  // 
  // - Note: uses a Breadth-First Search algorithm.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of Nodes in the Tree.
  get(value) {
    if (!this.root) {
      return null
    }
    
    const queue = new Queue()
    queue.add(this.root)

    while (!queue.isEmpty()) {
      const currentNode = queue.remove()

      if (currentNode.value === value) {
        return currentNode
      }

      for (const child of currentNode.children) {
        queue.add(child)
      }
    }

    return null
  }

  // Removes and returns the Node that contains the sought 
  // value if one is found, otherwise returns null.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of Nodes in the Tree.
  remove(value) {
    if (!this.root) {
      return null
    }
    
    if (this.root.value === value) {
      const removedNode = this.root
      this.root = null
      return removedNode
    }

    const parentNode = this.#getParentOf(value)

    if (!parentNode) {
      return null
    }

    const childIndex = parentNode.children.findIndex(
      (element) => element.value === value)
    const removedNode = parentNode.children.splice(childIndex, 1)

    return removedNode
  }

  // Removes all Nodes from the Tree. Returns an empty Tree.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.root = null
    return this
  }
}