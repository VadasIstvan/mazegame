import React from 'react'

const CharacterSelection = ({ onSelect }) => {
  const characters = [
    { id: 'horse1', name: 'Horse 1', image: '/images/horse1.png' },
    { id: 'horse2', name: 'Horse 2', image: '/images/horse2.png' },
    { id: 'horse3', name: 'Horse 3', image: '/images/horse3.png' },
  ]

  return (
    <div>
      <h2>Select Your Horse</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => onSelect(char)}
            style={{
              width: '100px',
              height: '100px',
              background: `url(${char.image}) no-repeat center/cover`,
              border: '2px solid black',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
            title={char.name}
          />
        ))}
      </div>
    </div>
  )
}

export default CharacterSelection
