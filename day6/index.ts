const input = await Deno.readTextFile('./input.txt').then((str) =>
  str.split('\n').filter(Boolean)[0].split('')
)

function test(count: number) {
  for (let i = count - 1; i < input.length; i++) {
    const test = [...new Set(input.slice(i - (count - 1), i + 1))]
    if (test.length === count) return i + 1
  }
}

const answerPart1 = test(4)
const answerPart2 = test(14)

console.log({ answerPart1, isCorrect: answerPart1 === 1343 })
console.log({ answerPart2, isCorrect: answerPart2 === 2193 })
