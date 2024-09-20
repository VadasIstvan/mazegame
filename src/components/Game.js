import React, { useState, useEffect } from 'react'
import Maze from './Maze'
import CharacterSelection from './CharacterSelection'
import Controls from './Controls'

const Game = () => {
  const [maze, setMaze] = useState(null)
  const [character, setCharacter] = useState(null)
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 })
  const [gameState, setGameState] = useState('selection') // 'selection', 'playing', 'won'
  const [moveCount, setMoveCount] = useState(0)
  const [hayCount, setHayCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [collectedHay, setCollectedHay] = useState(0)

  const generateMaze = (width, height, hayAmount) => {
    const maze = Array(height)
      .fill()
      .map(() => Array(width).fill(1))

    const carve = (x, y) => {
      const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ].sort(() => Math.random() - 0.5)

      for (let [dx, dy] of directions) {
        const nx = x + dx * 2,
          ny = y + dy * 2
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === 1) {
          maze[y + dy][x + dx] = 0
          maze[ny][nx] = 0
          carve(nx, ny)
        }
      }
    }

    maze[1][1] = 0
    carve(1, 1)

    // Set exit point
    maze[height - 2][width - 2] = 2

    // Place hay
    let hayPlaced = 0
    while (hayPlaced < hayAmount) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      if (maze[y][x] === 0) {
        maze[y][x] = 3 // 3 represents hay
        hayPlaced++
      }
    }

    return maze
  }

  useEffect(() => {
    const newMaze = generateMaze(21, 21, 10) // 10 pieces of hay
    setMaze(newMaze)
    setHayCount(10)
  }, [])

  useEffect(() => {
    let interval
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  const handleCharacterSelect = (selectedCharacter) => {
    setCharacter(selectedCharacter)
    setGameState('playing')
  }

  const handleMove = (direction) => {
    if (gameState !== 'playing') return

    const { x, y } = playerPosition
    let newX = x,
      newY = y

    switch (direction) {
      case 'up':
        newY = y - 1
        break
      case 'down':
        newY = y + 1
        break
      case 'left':
        newX = x - 1
        break
      case 'right':
        newX = x + 1
        break
      default:
        break
    }

    if (
      maze &&
      newX >= 0 &&
      newX < maze[0].length &&
      newY >= 0 &&
      newY < maze.length &&
      maze[newY][newX] !== 1
    ) {
      setPlayerPosition({ x: newX, y: newY })
      setMoveCount((prevCount) => prevCount + 1)

      if (maze[newY][newX] === 2) {
        setGameState('won')
      } else if (maze[newY][newX] === 3) {
        setCollectedHay((prevCount) => prevCount + 1)
        const newMaze = [...maze]
        newMaze[newY][newX] = 0
        setMaze(newMaze)
      }
    }
  }

  const resetGame = () => {
    const newMaze = generateMaze(21, 21, 10)
    setMaze(newMaze)
    setPlayerPosition({ x: 1, y: 1 })
    setMoveCount(0)
    setTimer(0)
    setCollectedHay(0)
    setHayCount(10)
    setGameState('playing')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-3xl font-bold mb-4'>Horse Maze Adventure</h1>

      {gameState === 'selection' && <CharacterSelection onSelect={handleCharacterSelect} />}

      {gameState !== 'selection' && (
        <div className='w-full max-w-md'>
          {maze && character && (
            <Maze maze={maze} playerPosition={playerPosition} character={character} />
          )}
          <div className='mt-4 text-center'>
            <p>
              Moves: {moveCount} | Time: {timer}s | Hay: {collectedHay}/{hayCount}
            </p>
          </div>
          <Controls onMove={handleMove} />
          {gameState === 'won' && (
            <div className='mt-4 text-center'>
              <h2 className='text-2xl font-bold'>Victory!</h2>
              <p>Moves: {moveCount}</p>
              <p>Time: {timer} seconds</p>
              <p>
                Hay Collected: {collectedHay}/{hayCount}
              </p>
              <button
                onClick={resetGame}
                className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Play Again
              </button>
            </div>
          )}
          {gameState === 'playing' && (
            <button
              onClick={resetGame}
              className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Game
