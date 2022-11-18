// Hash Table
// 
// A Hash Table is a data structure that utilizes a hash 
// function to organize data into specific groups 
// (buckets), where the job of the hash function is to 
// derive such bucket indexes for each individual element.
// 
// A collision occurs when the same bucket index is 
// calculated for different data. Collided items are 
// then placed sequentially within a given bucket. 
// This can degrade the performance of operations.
// 
// The advantage of a Hash Table is that, given a good 
// hashing algorithm, insertion, deletion, and lookup of 
// elements on average takes constant time.
// 
// This implementation provides four operations to do with 
// a Hash Table: set, get, remove, removeAll. Other 
// implementations are possible.
// 
//     Hash Function               Hash Table
//     ‾‾‾‾‾‾‾‾‾‾‾‾‾               ‾‾‾‾‾‾‾‾‾‾‾
//                        │ ┌───────┐     ┌──────────┐
// "Google" ────▶ 32 ───▶   │   0   │ ──▶ │ "Google" │
//                        │ ├───────┤     └──────────┘
//                          │   1   │
//                        │ ├───────┤     ┌─────────┬─────────────┐
// "Adobe" ─────▶ 34 ──┬▶   │   2   │ ──▶ │ "Adobe" │ "Bloomberg" │
// "Bloomberg" ─▶ 106 ─┘  │ ├───────┤     └─────────┴─────────────┘
//                             ...
//                        │ ├───────┤
//                          │   7   │
//                        │ └───────┘
// 
// Additional resources:  
// - https://spectrum.ieee.org/hans-peter-luhn-and-the-birth-of-the-hashing-algorithm
// - https://www.youtube.com/watch?v=nvzVHwrrub0


import { getUnicodeRepresentation } from './utils/main.js'
import { sumDigits } from './utils/main.js'
import { linearSearch } from './utils/main.js'

export default class HashTable {
  constructor(capacity = 128, customHashFunction = null) {
    this.hashTable = Array(capacity)
    this.capacity = capacity
    this.customHashFunction = customHashFunction
  }

  // Calculates a hash code by adding all digits of the 
  // given value or of the Unicode representation of the 
  // value in case that value is of type String. Returns 
  // the generated hash code.
  // 
  // - Complexity (Scalability): O(1).
  #simpleHashFunction(value) {
    if (typeof value !== 'number' && typeof value !== 'string') {
      throw new Error(`Type ${typeof value} of value ${value} is not supported. Provide value of type Number or String.`)
    }

    let hashCode = 0
    
    if (typeof value === 'number') {
      hashCode = sumDigits(value)
    } else if (typeof value === 'string') {
      const unicodeRepresentation = +getUnicodeRepresentation(value)
      hashCode = sumDigits(unicodeRepresentation)
    }

    return hashCode
  }

  // Calculates a bucket index that is derived from the hash 
  // code and the capacity of the Hash Table.
  // 
  // - Complexity (Scalability): O(1).
  #calculateBucketIndex(value) {
    const hashCode = this.customHashFunction 
      ? this.customHashFunction(value) 
      : this.#simpleHashFunction(value)
    const bucketIndex = hashCode % this.capacity

    return bucketIndex
  }

  // Sets a backet at a calculated index to a given value. 
  // Handles collisions if occur. Returns an updated Hash 
  // Table.
  // 
  // - Complexity (Scalability): O(1) on average.
  set(value) {
    const bucketIndex = this.#calculateBucketIndex(value)
    
    // If the bucket is empty
    if (this.hashTable[bucketIndex] === undefined) {
      this.hashTable[bucketIndex] = [value]

    // If collision occurred
    } else {
      this.hashTable[bucketIndex].push(value)
    }

    return this
  }

  // Returns the sought value if such is found, otherwise 
  // null.
  // 
  // - Complexity (Scalability): O(1) on average.
  get(value) {
    const bucketIndex = this.#calculateBucketIndex(value)

    // If the bucket is empty
    if (this.hashTable[bucketIndex] === undefined) {
      return null
    }

    const bucket = this.hashTable[bucketIndex]
    const indexWithinABucket = linearSearch(bucket, value)

    // If the value is not found within a bucket
    if (indexWithinABucket === null) {
      return null
    }

    return [bucketIndex, indexWithinABucket]
  }

  // Removes and returns the sought value if such is found, 
  // otherwise returns null.
  // 
  // - Complexity (Scalability): O(1) on average.
  remove(value) {
    const locationOfValue = this.get(value)

    if (!locationOfValue) {
      return null
    }

    const [bucketIndex, indexWithinABucket] = locationOfValue

    const bucket = this.hashTable[bucketIndex]
    bucket.splice(indexWithinABucket, 1)

    return value
  }

  // Removes all buckets from the Hash Table. Returns an 
  // empty Hash Table.
  // 
  // - Complexity (Scalability): O(1).
  removeAll() {
    this.hashTable = Array(capacity)
    return this
  }
}