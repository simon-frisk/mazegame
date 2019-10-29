export class Maze {
  private cells: Cell[] = []

  constructor(private rows: number, private columns: number) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.cells.push(new Cell(x, y, 30))
      }
    }
    const startCell = this.getRandomNotVisitedCell()
    startCell.visit()

    this.walk(this.getRandomNotVisitedCell())
  }

  private walk(cell: Cell) {
    let nextCell: Cell
    if (cell.isVisited()) {
      nextCell = this.getRandomNotVisitedCell()
      if (!nextCell) return
    } else {
      cell.visit()
      nextCell = this.getRandomNeighbor(cell)
      this.removeWalls(cell, nextCell)
    }
    this.walk(nextCell)
  }

  private getCellNeighBors(cell: Cell) {
    const cellIndex = cell.getX() + cell.getY() * this.columns
    const right = this.cells[cellIndex + 1]
    const left = this.cells[cellIndex - 1]
    const down = this.cells[cellIndex + this.columns]
    const up = this.cells[cellIndex - this.columns]
    const neighBors: Cell[] = []
    if (right && cell.isWall(1)) neighBors.push(right)
    if (left && cell.isWall(3)) neighBors.push(left)
    if (up && cell.isWall(0)) neighBors.push(up)
    if (down && cell.isWall(2)) neighBors.push(down)
    return neighBors
  }

  getRandomNeighbor(cell: Cell) {
    const neighBors = this.getCellNeighBors(cell)

    const randomIndex = Math.floor(Math.random() * neighBors.length)
    return neighBors[randomIndex]
  }

  private getRandomNotVisitedCell() {
    const notVisitedCells = this.cells.filter(cell => !cell.isVisited())
    if (notVisitedCells.length === 0) return undefined
    const i = Math.floor(Math.random() * notVisitedCells.length)
    return notVisitedCells[i]
  }

  private removeWalls(cell1: Cell, cell2: Cell) {
    if (cell1.getX() < cell2.getX()) {
      cell1.removeWall(1)
      cell2.removeWall(3)
    } else if (cell2.getX() < cell1.getX()) {
      cell2.removeWall(1)
      cell1.removeWall(3)
    } else if (cell1.getY() < cell2.getY()) {
      cell1.removeWall(2)
      cell2.removeWall(0)
    } else {
      cell1.removeWall(0)
      cell2.removeWall(2)
    }
  }

  render(c: CanvasRenderingContext2D) {
    this.cells.forEach(cell => cell.render(c))
  }
}

class Cell {
  private walls: boolean[] = [true, true, true, true]
  private visited: boolean = false

  constructor(private x: number, private y: number, private width: number) {}

  private screenX() {
    return this.x * this.width
  }

  private screenY() {
    return this.y * this.width
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  isVisited() {
    return this.visited
  }

  visit() {
    this.visited = true
  }

  removeWall(wall: number) {
    this.walls[wall] = false
  }

  isWall(wall: number) {
    return this.walls[wall]
  }

  render(c: CanvasRenderingContext2D) {
    const x = this.screenX()
    const y = this.screenY()
    c.beginPath()
    if (this.walls[0]) {
      c.moveTo(x, y)
      c.lineTo(x + this.width, y)
    }
    if (this.walls[1]) {
      c.moveTo(x + this.width, y)
      c.lineTo(x + this.width, y + this.width)
    }
    if (this.walls[2]) {
      c.moveTo(x + this.width, y + this.width)
      c.lineTo(x, y + this.width)
    }
    if (this.walls[3]) {
      c.moveTo(x, y + this.width)
      c.lineTo(x, y)
    }
    c.closePath()
    c.stroke()
  }
}
