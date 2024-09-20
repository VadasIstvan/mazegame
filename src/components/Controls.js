import React, { useEffect } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

const Controls = ({ onMove }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          onMove('up')
          break
        case 'ArrowDown':
          onMove('down')
          break
        case 'ArrowLeft':
          onMove('left')
          break
        case 'ArrowRight':
          onMove('right')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [onMove])

  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='mb-2'>
        <button
          onClick={() => onMove('up')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          <ArrowUp size={24} />
        </button>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => onMove('left')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => onMove('down')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
        >
          <ArrowDown size={24} />
        </button>
        <button
          onClick={() => onMove('right')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default Controls
