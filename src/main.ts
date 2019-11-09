import createCanvas from './canvas'
import { Maze } from './maze'
import Player from './Player'

const canvas = createCanvas()
const c = canvas.getContext('2d')
const FPS = 30

const maze = new Maze(30, 30)

const tick = () => {
  c.clearRect(0, 0, canvas.width, canvas.height)
  maze.render(c)
}

setInterval(tick, 1000 / FPS)
