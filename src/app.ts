import { Terminal } from 'command-line-draw'
import { createLifes, nextGeneration } from './gameOfLifeLogic/game'

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

;(async () => {
  const terminal = new Terminal()
  terminal.clear()
  let lifes: number[][] = createLifes(terminal.height - 1, terminal.width / 2)
  let paused = false
  let time = 1000
  let generation = 0
  terminal.bitmap(0, 1, lifes as unknown as boolean[][])

  terminal.write(
    `Speed: ${time} Generation: ${generation} ${paused ? 'Paused' : ''}`,
    0,
    0
  )

  terminal.in.on('keypress', (chunk, key) => {
    if (key.name === 'space') {
      paused = !paused
    }
    if (key.name === 'up') {
      time += 100
    }
    if (key.name === 'down') {
      time -= 100
    }

    terminal.write(
      `Speed: ${time} Generation: ${generation} ${paused ? 'Paused' : ''}`,
      0,
      0
    )
  })

  while (true) {
    if (paused) {
      await wait(1000)
      continue
    }
    terminal.clear()

    lifes = nextGeneration(lifes)
    await wait(time)
    terminal.bitmap(0, 1, lifes as unknown as boolean[][])
    generation++
    terminal.write(
      `Speed: ${time} Generation: ${generation} ${paused ? 'Paused' : ''}`,
      0,
      0
    )
  }
})()
