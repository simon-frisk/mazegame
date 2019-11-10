export default class Cell {
  private walls: boolean[] = [true, true, true, true]

  constructor(private x: number, private y: number) {}

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  removeWall(wall: number) {
    this.walls[wall] = false
  }

  restoreWalls() {
    this.walls = this.walls.map(() => true)
  }

  isWall(wall: number) {
    return this.walls[wall]
  }

  render(c: CanvasRenderingContext2D, width: number) {
    const x = this.x * width
    const y = this.y * width
    c.beginPath()
    if (this.walls[0]) {
      c.moveTo(x, y)
      c.lineTo(x + width, y)
    }
    if (this.walls[1]) {
      c.moveTo(x + width, y)
      c.lineTo(x + width, y + width)
    }
    if (this.walls[2]) {
      c.moveTo(x + width, y + width)
      c.lineTo(x, y + width)
    }
    if (this.walls[3]) {
      c.moveTo(x, y + width)
      c.lineTo(x, y)
    }
    c.closePath()
    c.stroke()
  }
}
