import { readFile } from 'node:fs/promises'

const input = await readFile('./input.txt', { encoding: 'utf8' })

const rock = 'rock'
const paper = 'paper'
const scissors = 'scissors'

const win = 'win'
const lose = 'lose'
const draw = 'draw'

const strategyMap = {
  A: rock,
  B: paper,
  C: scissors,
  X: rock,
  Y: paper,
  Z: scissors,
}

const outcomeMap = {
  X: lose,
  Y: draw,
  Z: win,
}

const winScore = 6
const drawScore = 3
const loseScore = 0

const scores = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

function calculateScore([theirs, yours]) {
  if (theirs === yours) {
    return drawScore + scores[yours]
  }
  if (theirs === rock && yours === paper) {
    return winScore + scores[paper]
  }
  if (theirs === paper && yours === scissors) {
    return winScore + scores[scissors]
  }
  if (theirs === scissors && yours === rock) {
    return winScore + scores[rock]
  }
  return loseScore + scores[yours]
}

function calculateActionForOutcome([theirs, outcome]) {
  if (outcome === draw) {
    return theirs
  }
  switch (theirs) {
    case rock: {
      return outcome === win ? paper : scissors
    }
    case scissors: {
      return outcome === win ? rock : paper
    }
    case paper: {
      return outcome === win ? scissors : rock
    }
  }
}

const data = input
  .toString()
  .split('\n')
  .filter(Boolean)
  .map((r) => r.split(' '))

const answerPart1 = data
  .map(([theirs, yours]) => [strategyMap[theirs], strategyMap[yours]])
  .map(calculateScore)
  .reduce((acc, curr) => acc + curr, 0)

console.log({ answerPart1, isCorrect: answerPart1 === 13809 })

const answerPart2 = data
  .map(([theirs, outcome]) => [
    strategyMap[theirs],
    calculateActionForOutcome([strategyMap[theirs], outcomeMap[outcome]]),
  ])
  .map(calculateScore)
  .reduce((acc, curr) => acc + curr, 0)

console.log({ answerPart2, isCorrect: answerPart2 === 12316 })
