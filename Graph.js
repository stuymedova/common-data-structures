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

  addVertex(value) {
    const node = new Node(value)
    this.nodes.push(node)

    return this
  }

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

  get(value) {
    const soughtNode = this.nodes.find((node) => node.value === value)
    return soughtNode ? soughtNode : null
  }

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

  removeEdge(source, destination) {
    const sourceNode = this.get(source)

    if (!sourceNode) {
      throw new Error('Source Node is not found.')
    }

    // Within the source node, find the node with destination 
    // value.
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

  removeAll() {
    this.nodes = []
    return this
  }
}