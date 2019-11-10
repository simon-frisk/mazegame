import Cell from './Cell'

export default class Maze {
  private cells: Cell[] = []
  private addedCells: Cell[] = []
  private currentPath: Cell[] = []

  constructor(
    private rows: number,
    private columns: number,
    private cellWidth: number
  ) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.cells.push(new Cell(x, y))
      }
    }
    const startCell = this.getRandomNotIncludedCell()
    this.addedCells.push(startCell)

    this.walk(this.getRandomNotIncludedCell())
  }

  private walk(cell: Cell) {
    let nextCell: Cell
    if (this.currentPath.includes(cell)) {
      this.currentPath.forEach(cell => cell.restoreWalls())
      this.currentPath = []
      nextCell = this.getRandomNotIncludedCell()
    } else if (this.addedCells.includes(cell)) {
      this.addedCells.push(...this.currentPath)
      this.currentPath = []
      nextCell = this.getRandomNotIncludedCell()
      if (!nextCell) return
    } else {
      this.currentPath.push(cell)
      nextCell = this.getRandomNeighbor(cell)
      this.removeWalls(cell, nextCell)
    }
    this.walk(nextCell)
  }

  getRandomNeighbor(cell: Cell) {
    const neighBors = this.getCellNeighBors(cell)

    const randomIndex = Math.floor(Math.random() * neighBors.length)
    return neighBors[randomIndex]
  }

  private getRandomNotIncludedCell() {
    const notIncludedCells = this.cells.filter(
      cell => !this.addedCells.includes(cell)
    )
    if (notIncludedCells.length === 0) return
    const randomIndex = Math.floor(Math.random() * notIncludedCells.length)
    return notIncludedCells[randomIndex]
  }

  private getCellNeighBors(cell: Cell) {
    const cellIndex = cell.getX() + cell.getY() * this.columns
    const right = this.cells[cellIndex + 1]
    const left = this.cells[cellIndex - 1]
    const down = this.cells[cellIndex + this.columns]
    const up = this.cells[cellIndex - this.columns]
    const neighBors: Cell[] = []
    if (right && cell.isWall(1) && right.getY() === cell.getY())
      neighBors.push(right)
    if (left && cell.isWall(3) && left.getY() === cell.getY())
      neighBors.push(left)
    if (up && cell.isWall(0)) neighBors.push(up)
    if (down && cell.isWall(2)) neighBors.push(down)
    return neighBors
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
    this.cells.forEach(cell => cell.render(c, this.cellWidth))
  }
}
