// Binary Search Tree
//
// A type of a Binary Tree that is structured such as
// every Node that is less than or equal to the
// parent Node is placed to the left of such Node, and
// every Node that is greater — to the right.
//
// This implementation provides four operations to do with
// a Binary Search Tree: insert, get, remove, and
// removeAll. Other implementations are possible.
//
// TODO: check validity on insertion, balance, insert in
// the middle.
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

export default class BinarySearchTree {
  constructor() {
    this.root = null
    return this
  }

  // Returns the location (an array containing the parent
  // Node and the branch) of the Node that satisfies the
  // given predicate. If no such Node is found, returns
  // null.
  //
  // - Complexity (Scalability): O(log(n)) or the height of
  //   the Binary Search Tree.
  #conditionalGet(value, predicate) {
    let traversalNode = this.root
    let soughtNode = null
    let soughtBranch = ''

    while (traversalNode) {
      if (value <= traversalNode.value) {
        if (predicate(traversalNode.leftBranch)) {
          soughtNode = traversalNode
          soughtBranch = 'leftBranch'
          break
        } else {
          traversalNode = traversalNode.leftBranch
        }
      } else {
        if (predicate(traversalNode.rightBranch)) {
          soughtNode = traversalNode
          soughtBranch = 'rightBranch'
          break
        } else {
          traversalNode = traversalNode.rightBranch
        }
      }
    }

    return soughtNode ? [soughtNode, soughtBranch] : null
  }

  // Creates a new Node that contains the given value and
  // inserts it a null position. Returns the updated
  // Tree.
  //
  // - Complexity (Scalability): O(log(n)) or the height of
  //   the Binary Search Tree.
  insert(value) {
    const node = new Node(value)

    if (!this.root) {
      this.root = node
      return this
    }

    const [insertionNode, insertionBranch] =
      this.#conditionalGet(value, (node) => node === null)
    insertionNode[insertionBranch] = node

    return this
  }

  // Returns the Node that contains the sought value if such
  // is found, otherwise null.
  //
  // - Complexity (Scalability): O(log(n)) or the height of
  //   the Binary Search Tree.
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
  // - Complexity (Scalability): O(log(n)) or the height of
  //   the Binary Search Tree.
  remove(value) {
    if (!this.root) {
      return null
    }

    if (value === this.root.value) {
      const removedNode = this.root
      this.root = null
      return removedNode
    }

    const locationOfNode =
      this.#conditionalGet(value, (node) => node.value === value)

    if (!locationOfNode) {
      return null
    }

    const [removalNode, soughtBranch] = locationOfNode
    const removedNode = removalNode[soughtBranch]
    removalNode[soughtBranch] = null

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
