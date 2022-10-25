// Returns the index of the sought value if found, 
// otherwise null.

export default function linearSearch(array, soughtValue) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === soughtValue) {
      return i
    }
  }

  return null
}