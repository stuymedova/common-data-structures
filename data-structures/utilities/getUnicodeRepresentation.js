// Calculates the Unicode representation of a string.
export default function getUnicodeRepresentation(givenString) {
  if (typeof givenString !== 'string') {
    throw new Error(`Type ${typeof givenString} of value ${givenString} is not supported. Provide value of type String.`)
  }

  let unicodeRepresentation = ''

  for (let i = 0; i < givenString.length; i++) {
    unicodeRepresentation += givenString.charCodeAt(i).toString()
  }

  return unicodeRepresentation
}