export const nextGeneration = (lifes: number[][]): number[][] => {
  const newLifes: number[][] = []
  for (let i = lifes.length - 1; i >= 0; i--) {
    newLifes[i] = []
    for (let j = lifes[i].length - 1; j >= 0; j--) {
      const sum =
        checkUp(lifes, i, j) +
        checkDown(lifes, i, j) +
        checkRight(lifes, i, j) +
        checkLeft(lifes, i, j)

      if (
        (sum === 3 && lifes[i][j] === 0) ||
        ((sum === 2 || sum === 3) && lifes[i][j])
      ) {
        newLifes[i][j] = 1
        continue
      }
      newLifes[i][j] = 0
    }
  }
  return newLifes
}

export const createLifes = (width: number, height: number): number[][] => {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => Math.round(Math.random()))
  )
}

const checkUp = (lifes: number[][], x: number, y: number): number => {
  let sum = 0

  if (x > 0) {
    sum += lifes[x - 1][y]
    if (y < lifes[x].length - 1) {
      sum += lifes[x - 1][y + 1]
    }
    if (y > 0) {
      sum += lifes[x - 1][y - 1]
    }
  }

  return sum
}

const checkDown = (lifes: number[][], x: number, y: number): number => {
  let sum = 0

  if (x < lifes.length - 1) {
    sum += lifes[x + 1][y]
    if (y < lifes[x].length - 1) {
      sum += lifes[x + 1][y + 1]
    }
    if (y > 0) {
      sum += lifes[x + 1][y - 1]
    }
  }

  return sum
}

const checkRight = (lifes: number[][], x: number, y: number): number => {
  let sum = 0

  if (y < lifes[x].length - 1) {
    sum += lifes[x][y + 1]
  }

  return sum
}

const checkLeft = (lifes: number[][], x: number, y: number): number => {
  let sum = 0

  if (y > 0) {
    sum += lifes[x][y - 1]
  }

  return sum
}
