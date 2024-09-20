import React, { useRef, useEffect } from 'react'

const Maze = ({ maze, playerPosition, character }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const cellSize = canvas.width / maze[0].length

    const grassImg = new Image()
    const fenceImg = new Image()
    const hayImg = new Image()
    const exitImg = new Image()
    let loadedImages = 0

    const drawMaze = () => {
      // Draw grass background
      const pattern = ctx.createPattern(grassImg, 'repeat')
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw maze
      maze.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell === 1) {
            ctx.save()
            ctx.translate(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2)

            // Check if it's a vertical wall
            if (y > 0 && y < maze.length - 1 && maze[y - 1][x] === 1 && maze[y + 1][x] === 1) {
              ctx.rotate(Math.PI / 2) // Rotate 90 degrees
            }

            ctx.drawImage(fenceImg, -cellSize / 2, -cellSize / 2, cellSize, cellSize)
            ctx.restore()
          } else if (cell === 2) {
            ctx.drawImage(exitImg, x * cellSize, y * cellSize, cellSize, cellSize)
          } else if (cell === 3) {
            ctx.drawImage(hayImg, x * cellSize, y * cellSize, cellSize, cellSize)
          }
        })
      })

      // Draw player (horse)
      if (character) {
        const horseImg = new Image()
        horseImg.onload = () => {
          ctx.drawImage(
            horseImg,
            playerPosition.x * cellSize,
            playerPosition.y * cellSize,
            cellSize,
            cellSize
          )
        }
        horseImg.src = character.image
      }
    }

    grassImg.onload =
      fenceImg.onload =
      hayImg.onload =
      exitImg.onload =
        () => {
          loadedImages++
          if (loadedImages === 4) {
            drawMaze()
          }
        }

    grassImg.src = '/images/grass.png'
    fenceImg.src = '/images/fence.png'
    hayImg.src = '/images/hay.png'
    exitImg.src = '/images/exit.png'
  }, [maze, playerPosition, character])

  return <canvas ref={canvasRef} width={400} height={400} />
}

export default Maze
