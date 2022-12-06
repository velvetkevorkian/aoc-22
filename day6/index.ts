const input = await Deno.readTextFile('./input.txt').then((str) =>
  str.split('\n').filter(Boolean)[0].split('')
)

let answerPart1 = 0
let answerPart2 = 0

for (let i = 3; i < input.length; i++) {
  const test = [...new Set(input.slice(i - 3, i + 1))].length === 4
  if (test) {
    answerPart1 = i + 1
    break
  }
}

console.log({ answerPart1, isCorrect: answerPart1 === 1343 })

for (let i = 13; i < input.length; i++) {
  const test = [...new Set(input.slice(i - 13, i + 1))].length === 14
  if (test) {
    answerPart2 = i + 1
    break
  }
}

console.log({ answerPart2, isCorrect: answerPart2 === 2193 })
