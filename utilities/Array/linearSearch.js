// Returns the index of the sought value if found, 
// otherwise null.

export default function linearSearch(array, soughtValue) {
  if (typeof !value.isArray()) {
    throw new Error(`Type ${typeof value} of value ${value} is not supported. Provide value of type Array.`)
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] === soughtValue) {
      return i
    }
  }

  return null
}