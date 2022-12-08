const data = await Deno.readTextFile('./input.txt').then((str) =>
  str
    .split('\n')
    .filter(Boolean)
    .map((row) => row.split(''))
    .map((row) => row.map((i) => parseInt(i, 10)))
)

const rowCount = data.length
const colCount = data[0].length

const areVisible = data.map((row, i) => {
  // first and last row are always visible
  if (i === 0 || i === rowCount - 1) return row.map(() => true)

  return row.map((tree, j) => {
    // first and last column are always visible
    if (j === 0 || j === colCount - 1) return true
    const visibleFromLeft = !row.slice(0, j).some((x) => x >= tree)
    if (visibleFromLeft) return true

    const visibleFromRight = !row.slice(j + 1, rowCount).some((x) => x >= tree)
    if (visibleFromRight) return true

    const column = data.map((r) => r[j])
    const visibleFromAbove = !column.slice(0, i).some((x) => x >= tree)
    if (visibleFromAbove) return true

    const visibleFromBelow = !column
      .slice(i + 1, colCount)
      .some((x) => x >= tree)
    if (visibleFromBelow) return true

    return false
  })
})

const answerPart1 = areVisible
  .flat()
  .reduce((acc, curr) => (acc += curr ? 1 : 0), 0)

console.log({ answerPart1, isCorrect: answerPart1 === 1792 })

const scenicScores = data
  .map((row, i) => {
    if (i === 0 || i === rowCount - 1) return row.map(() => 0)
    return row.map((tree, j) => {
      if (j === 0 || j === colCount - 1) return 0

      const treesToLeft = row.slice(0, j).reverse()
      const leftIndex = treesToLeft.findIndex((x) => x >= tree)
      const leftScore = leftIndex === -1 ? treesToLeft.length : leftIndex + 1

      const treesToRight = row.slice(j + 1, rowCount)
      const rightIndex = treesToRight.findIndex((x) => x >= tree)
      const rightScore =
        rightIndex === -1 ? treesToRight.length : rightIndex + 1

      const column = data.map((r) => r[j])

      const treesAbove = column.slice(0, i).reverse()
      const upIndex = treesAbove.findIndex((x) => x >= tree)
      const upScore = upIndex === -1 ? treesAbove.length : upIndex + 1

      const treesBelow = column.slice(i + 1, colCount)
      const downIndex = treesBelow.findIndex((x) => x >= tree)
      const downScore = downIndex === -1 ? treesBelow.length : downIndex + 1

      return leftScore * upScore * rightScore * downScore
    })
  })

  .flat()
  .sort((a, b) => b - a)

const answerPart2 = scenicScores[0]
console.log({ answerPart2, isCorrect: answerPart2 === 334880 })
