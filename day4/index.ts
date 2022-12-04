const input = await Deno.readTextFile('./input.txt')
const data = input
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split(/-|,/).map((p) => parseInt(p, 10)))

const answerPart1 = data.filter(
  ([low1, high1, low2, high2]) =>
    (low1 >= low2 && high1 <= high2) || (low2 >= low1 && high2 <= high1)
).length

console.log({ answerPart1, isCorrect: answerPart1 === 456 })

const answerPart2 = data.filter(
  ([low1, high1, low2, high2]) =>
    (low2 >= low1 && low2 <= high1) || (low1 >= low2 && low1 <= high2)
).length

console.log({ answerPart2, isCorrect: answerPart2 === 808 })
