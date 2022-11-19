// Graph
// 
// A Graph is a collection of Nodes that may be in 
// connected to one other in various ways.
// 
// This implementation provides eight operations to do 
// with a Graph: addVertex, addEdge, get, hasPathDFS, 
// hasPathBFS, removeVertex, removeEdge, removeAll. Other 
// implementations are possible.
// 
// ┌───────┐      ┌───────┐      ┌───────┐
// │   0   │ ───▶ │   1   │ ◀─── │   2   │
// └───────┘      └───────┘      └───────┘
//     │     ╲        │     ╲        ▲
//     ▼       ◢      ▼       ◢      │
// ┌───────┐      ┌───────┐      ┌───────┐
// │   5   │      │   4   │ ◀─── │   3   │
// └───────┘      └───────┘      └───────┘
// 
// Additional resources:
// - https://github.com/jamiebuilds/itsy-bitsy-data-structures/
// - https://en.wikipedia.org/wiki/Graph_(abstract_data_type)


import { Queue } from './mod.js'

class Node {
  constructor(value) {
    this.value = value
    this.adjacent = []
  }
}

// This impements a directed acyclic Graph.
export default class Graph {
  constructor() {
    this.nodes = []
  }

  // Creates a new Node (aka Vertex) that contains the given 
  // value and adds it to the Graph. Returns the updated 
  // Graph.
  // 
  // - Complexity (Scalability): O(1) on average.
  addVertex(value) {
    const node = new Node(value)
    this.nodes.push(node)

    return this
  }

  // Adds destination Node (aka Vertex) to the list of 
  // adjacent Nodes of the source Node.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of Nodes in the Graph.
  addEdge(source, destination) {
    const sourceNode = this.get(source)
    const destinationNode = this.get(destination)

    if (!sourceNode) {
      throw new Error('Source Node is not found.')
    } else if (!destinationNode) {
      throw new Error('Destination Node is not found.')
    }

    sourceNode.adjacent.push(destinationNode)
    
    return this
  }

  // Returns the Node (aka Vertex) that contains the sought 
  // value if such is found, otherwise null.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of Nodes in the Graph.
  get(value) {
    const soughtNode = this.nodes.find((node) => node.value === value)
    return soughtNode ? soughtNode : null
  }

  // Returns true if there is a path between the Node (aka 
  // Vertex) with the given source value and the Node with 
  // the given destination value. Otherwise returns false.
  // 
  // - Note: uses a Depth-First Search algorithm.
  // 
  // - Complexity (Scalability): O(n), where n is the number
  //   of Nodes in the Graph.
  hasPathDFS(source, destination) {
    const sourceNode = this.get(source)
    const destinationNode = this.get(destination)
    const visitedNodes = []

    if (!sourceNode) {
      throw new Error('Source Node is not found.')
    } else if (!destinationNode) {
      throw new Error('Destination Node is not found.')
    }
    
    return this.#hasPathDFS(sourceNode, destinationNode, visitedNodes)
  }

  // An auxiliary method to hasPathDFS. Returns true if 
  // there is a path between the Node (aka Vertex) with the 
  // given source value and the Node with the given 
  // destination value. Otherwise returns false.
  // 
  // - Complexity (Scalability): O(n), where n is the number
  //   of Nodes in the Graph.
  #hasPathDFS(sourceNode, destinationNode, visitedNodes) {
    if (visitedNodes.includes(sourceNode.value)) {
      return false
    }

    visitedNodes.push(sourceNode.value)
    
    if (sourceNode.value === destinationNode.value) {
      return true
    }

    for (const child of sourceNode.adjacent) {
      if (this.hasPathDFS(child, destinationNode, visitedNodes)) {
        return true
      }
    }

    return false
  }

  // Returns true if there is a path between the Node (aka 
  // Vertex) with the given source value and the Node with 
  // the given destination value. Otherwise returns false.
  // 
  // - Note: uses a Breadth-First Search algorithm.
  // 
  // - Complexity (Scalability): O(n), where n is the number
  //   of Nodes in the Graph.
  hasPathBFS(source, destination) {
    const sourceNode = this.get(source)
    const destinationNode = this.get(destination)
    const queue = new Queue()
    const visitedNodes = []

    if (!sourceNode) {
      throw new Error('Source Node is not found.')
    } else if (!destinationNode) {
      throw new Error('Destination Node is not found.')
    }

    queue.add(sourceNode)

    while (!queue.isEmpty()) {
      const currentNode = queue.remove()

      if (currentNode.value = destinationNode.value) {
        return true
      }

      if (visitedNodes.includes(currentNode.value)) {
        continue
      }
      visitedNodes.push(currentNode.value)

      for (const child of currentNode.adjacent) {
        queue.add(child)
      }
    }

    return false
  }

  // Removes the Node (aka Vertex) that contains the sought 
  // value, as well as all Edges that point to such Node. 
  // Returns the removed Node if such is found, otherwise 
  // returns null.
  // 
  // - Complexity (Scalability): O(e), where e is the number 
  //   of Edges in the Graph.
  removeVertex(value) {
    const soughtNode = this.get(value)
    const soughtNodeIndex = this.nodes.indexOf(soughtNode)

    if (soughtNodeIndex === -1) { 
      return null 
    }
    
    const removedNodeCopy = {...this.nodes[soughtNodeIndex]}
    const removedNode = this.nodes.splice(soughtNodeIndex, 1)

    // Search for any incoming edges, remove if found.
    for (const node of this.nodes) {
      this.removeEdge(node.value, removedNodeCopy.value)
    }

    return removedNode
  }

  // Within the list of adjacent Nodes (aka Vertices) of the 
  // source Node finds the Node with the value equal to the 
  // given value of the destination Node, and removes such 
  // Node. Returns the Graph if the Node is found, otherwise 
  // returns null.
  // 
  // - Complexity (Scalability): O(n), where n is the number 
  //   of Nodes in the Graph.
  removeEdge(source, destination) {
    const sourceNode = this.get(source)

    if (!sourceNode) {
      throw new Error('Source Node is not found.')
    }

    // Within the source node, find the Node with value equal 
    // to destination value.
    const adjacentNodes = sourceNode.adjacent

    for (const currentNode of adjacentNodes) {
      if (currentNode.value === destination) {
        const currentNodeIndex = adjacentNodes.indexOf(destination)
        adjacentNodes.splice(currentNodeIndex, 1)

        return this
      }
    }

    return null
  }

  // Removes all Nodes (aka Vertices) and Edges from the 
  // Graph. Returns an empty Graph.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.nodes = []
    return this
  }
}