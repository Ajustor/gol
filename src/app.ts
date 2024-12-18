import { Terminal } from 'command-line-draw'
import { createLifes, nextGeneration } from './gameOfLifeLogic/game'

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const terminal = new Terminal()
terminal.clear()
let lifes: number[][] = createLifes(terminal.height - 1, terminal.width / 2)
let paused = false
let time = 1000
let generation = 0
terminal.bitmap(0, 1, lifes as unknown as boolean[][])

terminal.write(
  `Delay between generation: ${time} Generation: ${generation} ${paused ? 'Paused' : ''}`,
  0,
  0
)

terminal.in.on('keypress', (_, key) => {
  if (key.name === 'space') {
    paused = !paused
    terminal.clear()
  }
  if (key.name === 'up') {
    time += 100
  }
  if (key.name === 'down') {
    time -= 100
  }

  terminal.write(
    `Delay between generation: ${time} Generation: ${generation} ${paused ? 'Paused' : ''}`,
    0,
    0
  )
  terminal.bitmap(0, 1, lifes as unknown as boolean[][])
})

while (true) {
  if (paused) {
    await wait(1000)
    continue
  }

  lifes = nextGeneration(lifes)
  await wait(time)
  terminal.bitmap(0, 1, lifes as unknown as boolean[][])
  generation++
  terminal.write(
    `Delay between generation: ${time} Generation: ${generation} ${paused ? 'Paused' : ''}`.padEnd(terminal.width, ' '),
    0,
    0
  )
}
