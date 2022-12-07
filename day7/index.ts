const input = await Deno.readTextFile('./input.txt').then((str) =>
  str.split('\n').filter(Boolean)
)

type Folder = {
  name: string
  children: Folder[]
  parent?: Folder
  size: number
}

const files: Folder = {
  name: '/',
  children: [],
  size: 0,
}
let currentFolder = files

input.forEach((command) => {
  const parts = command.split(' ')
  // cd home
  if (command === '$ cd /') {
    currentFolder = files
  }
  // list contents
  else if (command === '$ ls') {
    // do nothing
  }
  // cd up
  else if (command === '$ cd ..') {
    currentFolder = currentFolder.parent as Folder
  }
  // cd down
  else if (parts[0] === '$' && parts[1] === 'cd') {
    currentFolder = currentFolder.children.find(
      (f) => f.name === parts[2]
    ) as Folder
  }
  // add dir
  else if (parts[0] === 'dir') {
    currentFolder.children.push({
      name: parts[1],
      children: [],
      parent: currentFolder,
      size: 0,
    })
  }
  // add file
  else if (parts[0].match(/^\d*$/)) {
    const size = parseInt(parts[0])
    currentFolder.size += size
  }
})

let answerPart1 = 0
function getTotalSize(folder: Folder) {
  let size = folder.size
  folder.children.forEach((child) => {
    size += getTotalSize(child)
  })
  if (size < 100000) {
    answerPart1 += size
  }
  return size
}

getTotalSize(files)

console.log({ answerPart1, isCorrect: answerPart1 === 1555642 })

const totalSpace = 70000000
const requiredSpace = 30000000

function getSize(folder: Folder) {
  let size = folder.size
  folder.children.forEach((child) => {
    size += getSize(child)
  })
  return size
}

const sizes: number[] = []
function getSizes(folder: Folder) {
  let size = folder.size
  folder.children.forEach((child) => {
    size += getSizes(child)
  })
  sizes.push(size)
  return size
}

const unusedSpace = totalSpace - getSize(files)
const sizeToDelete = requiredSpace - unusedSpace

getSizes(files)
const answerPart2 = sizes
  .filter((f) => f >= sizeToDelete)
  .sort((a, b) => a - b)[0]
console.log({ answerPart2, isCorrect: answerPart2 === 5974547 })
