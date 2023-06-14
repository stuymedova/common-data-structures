// Calculates the sum of all digits of the given number.
export default function sumDigits(givenNumber) {
  if (typeof givenNumber !== 'number') {
    throw new Error(`Type ${typeof givenNumber} of value ${givenNumber} is not supported. Provide value of type Number.`)
  }

  let sum = 0
  
  while (givenNumber) {
    sum += givenNumber % 10
    givenNumber = Math.floor(givenNumber / 10)
  }
  return sum
}