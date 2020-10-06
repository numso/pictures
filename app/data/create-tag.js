import React from 'react'

export default function CreateTag ({ onClick, children }) {
  return (
    <div>
      <span onClick={onClick} className='tag --create'>
        {children}
      </span>
    </div>
  )
}
