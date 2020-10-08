import React, { useEffect } from 'react'

var originalNum, originalX

export default function Dragger ({ number, prefix, suffix, onChange, parse }) {
  const [myNumber, setMyNumber] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  useEffect(() => {
    if (!isDragging) setMyNumber(number)
  })

  const onDragStart = e => {
    setIsDragging(true)
    originalNum = parseFloat(myNumber)
    originalX = e.clientX
    // e.dataTransfer.setDragImage(document.getElementById('blank'), 0, 0);
  }

  const onDrag = e => {
    if (e.clientX === 0) return
    const delta = e.clientX - originalX
    const num = Math.floor(originalNum + (delta / 20) * 10)
    if (num !== myNumber) setNum(num)
  }

  const setNum = num => {
    const newVal = [prefix, num, suffix].join(' ').trim()
    onChange(parse(newVal))
    setMyNumber(num)
  }

  return (
    <span
      draggable='true'
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      {myNumber}
    </span>
  )
}
