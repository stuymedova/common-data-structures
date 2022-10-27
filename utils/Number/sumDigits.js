// Calculates the sum of all digits of the given number.

export default function sumDigits(value) {
  if (typeof value !== 'number') {
    throw new Error(`Type ${typeof value} of value ${value} is not supported. Provide value of type Number.`)
  }
  
  let sum = 0

  while (value) {
    sum += value % 10
    value = Math.floor(value / 10)
  }

  return sum
}