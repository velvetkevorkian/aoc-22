// deno run --allow-read 1.ts

const data = await Deno.readTextFile('./input.txt')
const chunks = data.toString().split('\n\n')

const totals = chunks
  .map((chunk) => chunk.split('\n'))
  .map((arr) => arr.reduce((acc, curr) => acc + parseInt(curr), 0))
  .sort((a, b) => b - a)

const answerPart1 = totals[0]
console.log({ answerPart1, isCorrect: answerPart1 === 67450 })

const answerPart2 = totals.slice(0, 3).reduce((acc, curr) => acc + curr, 0)
console.log({ answerPart2, isCorrect: answerPart2 === 199357 })
