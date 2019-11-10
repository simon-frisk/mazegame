const resizeCanvas = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const createCanvas = () => {
  const canvas = document.querySelector('canvas')
  resizeCanvas(canvas)
  window.addEventListener('resize', resizeCanvas.bind(null, canvas))
  return canvas
}

export default createCanvas
