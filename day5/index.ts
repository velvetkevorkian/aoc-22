const input = await Deno.readTextFile('./input.txt')
const [stack, movesData] = input.split('\n\n')

const rows = stack.split('\n').slice(0, 8)
type Column = string[]
let columns: Column[] = []

for (let i = 0; i < rows.length; i++) {
  const arr = rows[i].split('')
  for (let j = 0; j < 9; j++) {
    const item = arr[j * 4 + 1]
    columns[j] ? columns[j].push(item) : columns.push([item])
  }
}

columns = columns
  .map((c) => c.reverse())
  .map((col) => (col = col.filter((i) => i !== ' ')))

const columns2: Column[] = columns.map((c) => [...c])

const moves = movesData.split('\n').filter(Boolean)

moves.forEach((move) => {
  const [, count, , from, , to] = move.split(' ').map((i) => parseInt(i, 10))

  // part 1
  for (let i = 0; i < count; i++) {
    const item = columns[from - 1].pop()
    if (item) columns[to - 1].push(item)
  }

  // part 2
  const items = columns2[from - 1].splice(count * -1, count)
  columns2[to - 1].splice(Infinity, 0, ...items)
})

const parseResult = (arr: Column[]) =>
  arr
    .map((c) => c.reverse())
    .map((c) => c[0])
    .join('')

const answerPart1 = parseResult(columns)
const answerPart2 = parseResult(columns2)

console.log({ answerPart1, isCorrect: answerPart1 === 'QNHWJVJZW' })
console.log({ answerPart2, isCorrect: answerPart2 === 'BPCZJLFJW' })
