import { readFile } from 'node:fs/promises'

const data = await readFile('./input.txt', { encoding: 'utf8' })
const chunks = data.toString().split('\n\n')

const totals = chunks
  .map((chunk) => {
    let total = 0
    chunk.split('\n').forEach((i) => (total += parseInt(i)))
    return total
  })
  .sort((a, b) => b - a)

const answerPart1 = totals[0]
console.log({ answerPart1 })

const answerPart2 = totals[0] + totals[1] + totals[2]
console.log({ answerPart2 })
