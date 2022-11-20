// Trie
// 
// A Trie is a type of an n-ary tree that stores 
// characters at each Node. Thus each path down the tree 
// represents a word. 
// 
// The advantage of a Trie is that addition, lookup and 
// removal of words is done in O(n) time, where n is
// the length of the given word.
// 
// This implementation provides four operations to do with 
// a Trie: addWord, contains, removeWord, and removeAll. 
// Other implementations are possible.
// 
//                   ┌───────┐
//                   │   *   │
//                   └─┬─┬─┬─┘
//            ┌────────┘ │ └────────┐
//        ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
//        │   2   │  │   4   │  │   5   │
//        └───┬───┘  └───┬───┘  └───┬───┘
//      ┌─────┘          │          └─────┐
//  ┌───┴───┐        ┌───┴───┐        ┌───┴───┐
//  │   0   │        │   0   │        │   0   │
//  └───┬───┘        └─┬───┬─┘        └───┬───┘
//      │          ┌───┘   └───┐          │
//  ┌───┴───┐  ┌───┴───┐   ┌───┴───┐  ┌───┴───┐
//  │   0   │  │   3   │   │   4   │  │   0   │
//  └───────┘  └───────┘   └───────┘  └───────┘
// 
//          Trie of HTTP response codes
// 
// Additional resources:
// - https://www.youtube.com/watch?v=zIjfhVPRZCg
// - https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/trie


class Node {
  constructor(character) {
    this.character = character
    this.children = {}
    this.isTerminating = false
  }

  // Returns true if the Node has one or more children, 
  // otherwise returns false.
  // 
  // - Complexity (Scalability): O(n).
  hasChildren() {
    return Object.keys(this.children).length !== 0
  }

  // Returns the child Node whose character value matches 
  // the given one if found. Otherwise return null.
  // 
  // - Complexity (Scalability): O(1).
  getChild(character) {
    const childNode = this.children[character]

    if (childNode) {
      return childNode
    }
    
    return null
  }
  
  // Removes and returns the child Node whose character 
  // value matches the given one. If such Node is not 
  // found, or the given Node cannot be removed safely,
  // throws an error.
  // 
  // - Complexity (Scalability): O(1).
  removeChild(character) {
    const childNode = this.getChild(character)

    if (!childNode) {
      throw new Error('The given Node cannot be removed because it does not exist.')
    }

    if (childNode.hasChildren()) {
      throw new Error('The given Node cannot be removed because it is a part of a longer sequence. If you would like to remove a word, set the Node\'s property isTerminating to false.')
    }

    if (childNode.isTerminating) {
      throw new Error('The given Node cannot be removed because it terminates a sequence. If you are confident you want to remove this Node, make sure to set the isTerminating property of Node to false.')
    }

    delete this.children[character]
    return childNode
  }

  // Sets the Node's isTerminating property indicating that 
  // the Node with the preceding sequence constitutes a 
  // complete word to true.
  // 
  // - Complexity (Scalability): O(1).
  setAsTerminating() {
    this.isTerminating = true
    return this
  }

  // Sets the Node's isTerminating property to false.
  // 
  // - Complexity (Scalability): O(1).
  unsetAsTerminating() {
    this.isTerminating = false
    return this
  }
}

export default class Trie {
  constructor() {
    this.root = new Node('*')
  }

  // Adds a given word to the Trie.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of characters in the given word.
  addWord(word) {
    if (typeof word !== 'string') {
      word = word.toString()
    }

    let currentNode = this.root

    for (let i = 0; i < word.length; i++) {
      const character = word[i]
      let child = currentNode.getChild(character)

      if (!child) {
        child = new Node(character)
        currentNode.children[character] = child
      }

      currentNode = child
    }

    currentNode.setAsTerminating()
    return this
  }

  // Returns true if the Trie contains a given word, 
  // otherwise returns false.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of characters in the given word.
  contains(word, isExactMatch = false) {
    if (typeof word !== 'string') {
      word = word.toString()
    }

    let currentNode = this.root
    
    for (let i = 0; i < word.length; i++) {
      const character = word[i]
      const child = currentNode.getChild(character)

      if (!child) {
        return false
      }

      currentNode = child
    }

    if (isExactMatch) {
      return currentNode.isTerminating
    }

    return true
  }

  // Removes the given word from the Trie, returns an 
  // updated Trie. If the word does not exist or cannot be 
  // removed safely, throws an error.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of characters in the given word.
  removeWord(word) {
    if (typeof word !== 'string') {
      word = word.toString()
    }
    if (word.length === 0) {
      return null
    }

    this.#removeWord(word, 0, this.root)

    return this
  }

  // An auxiliary method to removeWord. Removes the given 
  // word from the Trie, returns an updated Trie. If the 
  // word does not exist or cannot be removed safely, 
  // throws an error.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of characters in the given word.
  #removeWord(word, i, currentNode) {
    const character = word[i]
    const child = currentNode.getChild(character)
    let isRemovalCompleted = false

    if (!child) {
      throw new Error('The given word cannot be removed because it does not exist.')
    }
    
    if (i !== word.length - 1) {
      isRemovalCompleted = this.#removeWord(word, i + 1, child)
    } else {
      // If the word has not matched exactly, throw an error.
      if (!child.isTerminating) {
        throw new Error('The given word cannot be removed because it has not matched exactly. Make sure to remove words whose length correspons to that of the added ones.')
      }

      // If the given word is part of a longer word then do 
      // not delete the Node, instead set the Node's 
      // isTerminating property to false, thus removing word 
      // from the Trie. Otherwise delete the Node.
      child.unsetAsTerminating()

      if (child.hasChildren()) {
        return true
      }

      currentNode.removeChild(character)
      return false
    }

    if (child.isTerminating || isRemovalCompleted) {
      return true
    }

    currentNode.removeChild(character)
    return false
  }

  // Removes all Nodes from the Trie. Returns an empty Trie.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.root = new Node('*')
    return this
  }
}