// Binary Search Tree
// 
// A type of a Binary Tree that is structured such as 
// every node that is less than the parent Node is placed 
// to the left of such node, and every Node that is 
// greater — to the right.
// 
// This implementation provides four operations to do with 
// a Binary Search Tree: insert, get, remove, and 
// removeAll. Other implementations are possible.
// 
//                   ┌───────┐
//                   │   5   │
//                   └─┬───┬─┘
//            ┌────────┘   └────────┐
//        ┌───┴───┐             ┌───┴───┐
//        │   2   │             │   7   │
//        └─┬───┬─┘             └─┬───┬─┘
//      ┌───┘   └───┐         ┌───┘   └───┐
//  ┌───┴───┐   ┌───┴───┐ ┌───┴───┐  ┌────┴───┐
//  │   1   │   │   3   │ │   6   │  │   12   │
//  └───────┘   └───────┘ └───────┘  └────────┘
// 
// Additional resources:
// - https://www.youtube.com/watch?v=oSWTXtMglKE


class Node {
  constructor(value) {
    this.value = value
    this.leftBranch = null
    this.rightBranch = null
  }
}

export default class BinaryTree {
  constructor() {
    this.root = null
  }

  // Returns an array containing a Node and a branch at 
  // which to insert the Node with the given value.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of Nodes in the Tree.
  #getInsertionPoint(value) {
    let traversalNode = this.root
    let insertionNode = null
    let insertionBranch = ''

    while (traversalNode) {
      if (value <= traversalNode.value) {
        if (traversalNode.leftBranch === null) {
          insertionNode = traversalNode
          insertionBranch = 'leftBranch'
          break
        } else {
          traversalNode = traversalNode.leftBranch
        }
      } else {
        if (traversalNode.rightBranch === null) {
          insertionNode = traversalNode
          insertionBranch = 'rightBranch'
          break
        } else {
          traversalNode = traversalNode.rightBranch
        }
      }
    }

    return [insertionNode, insertionBranch]
  }

  // Returns an array containing a Node and a branch 
  // from which to remove the Node with the given value.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of Nodes in the Tree.
  #getRemovalPoint(value) {
    let traversalNode = this.root
    let removalNode = null
    let removalBranch = ''

    while (traversalNode) {
      if (value <= traversalNode.value) {
        if (traversalNode.leftBranch?.value === value) {
          removalNode = traversalNode
          removalBranch = 'leftBranch'
          break
        } else {
          traversalNode = traversalNode.leftBranch
        }
      } else {
        if (traversalNode.rightBranch?.value === value) {
          removalNode = traversalNode
          removalBranch = 'rightBranch'
          break
        } else {
          traversalNode = traversalNode.rightBranch
        }
      }
    }

    return removalNode ? [removalNode, removalBranch] : null
  }

  // Creates a new Node that contains the given value and 
  // inserts it a calculated position. Returns the updated 
  // Tree.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of Nodes in the Tree.
  insert(value) {
    const node = new Node(value)

    if (!this.root) {
      this.root = node
      return this
    }

    const [insertionNode, insertionBranch] = 
      this.#getInsertionPoint(value)
    insertionNode[insertionBranch] = node
    
    return this
  }

  // Returns the Node that contains the sought value if such 
  // is found, otherwise null.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of Nodes in the Tree.
  get(value) {
    if (!this.root) {
      return null
    }

    let traversalNode = this.root

    while (traversalNode) {
      if (value <= traversalNode.value) {
        if (value === traversalNode.value && 
            value !== traversalNode.leftBranch?.value) {
          return traversalNode
        }

        traversalNode = traversalNode.leftBranch
      } else {
        traversalNode = traversalNode.rightBranch
      }
    }

    return null
  }

  // Removes and returns the Node that contains the sought 
  // value if one is found, otherwise returns null.
  // 
  // - Complexity (Scalability): O(log(n)), where n is the 
  //   number of Nodes in the Tree.
  remove(value) {
    if (!this.root) {
      return null
    }

    if (value === this.root.value) {
      const removedNode = this.root
      this.root = null
      return removedNode
    }

    const locationOfNode = this.#getRemovalPoint(value)

    if (!locationOfNode) {
      return null
    }

    const [removalNode, removalBranch] = locationOfNode
    removalNode[removalBranch] = null

    return removalNode
  }

  // Removes all Nodes from the Tree. Returns an empty Tree.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.root = null
    return this
  }
}