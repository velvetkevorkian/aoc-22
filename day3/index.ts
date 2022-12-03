const input = await Deno.readTextFile('./input.txt')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const priorities = ' ' + alphabet + alphabet.toUpperCase()

const data = input.split('\n').filter(Boolean)

const sum = (acc: number, curr: number) => acc + curr

const answerPart1 = data
  .map((rs) => [rs.slice(0, rs.length / 2), rs.slice(rs.length / 2)])
  .map(([pocket1, pocket2]) => {
    let match = ''
    pocket1.split('').forEach((char) => {
      if (pocket2.includes(char)) {
        match = char
      }
    })
    return match
  })
  .map((i) => priorities.indexOf(i))
  .reduce(sum, 0)

console.log({ answerPart1, isCorrect: answerPart1 === 7766 })

const badges = []

for (let i = 0; i < data.length; i += 3) {
  let match = ''
  data[i].split('').forEach((char) => {
    if (data[i + 1].includes(char) && data[i + 2].includes(char)) {
      match = char
    }
  })
  badges.push(match)
}

const answerPart2 = badges.map((b) => priorities.indexOf(b)).reduce(sum, 0)

console.log({ answerPart2, isCorrect: answerPart2 === 2415 })
