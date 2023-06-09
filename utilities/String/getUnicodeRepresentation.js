// Calculates the Unicode representation of a string.

export default function getUnicodeRepresentation(string) {
  if (typeof string !== 'string') {
    throw new Error(`Type ${typeof value} of value ${value} is not supported. Provide value of type String.`)
  }

  let unicodeRepresentation = ''

  for (let i = 0; i < string.length; i++) {
    unicodeRepresentation += string.charCodeAt(i).toString()
  }

  return unicodeRepresentation
}