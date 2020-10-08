import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'

import { generateParts, getDomMsg } from '../common/drawing'

var x1 = null
var y1

export default function BigPicture ({
  mode,
  picture,
  selectedStep,
  updatePicture
}) {
  const [preview, setPreview] = React.useState(null)
  function mouseDown (e) {
    x1 = e.nativeEvent.offsetX
    y1 = e.nativeEvent.offsetY
  }
  function mouseMove (e) {
    if (x1 === null) return
    const x2 = e.nativeEvent.offsetX
    const y2 = e.nativeEvent.offsetY
    if (mode === 'circle') {
      const r = distance(x1, y1, x2, y2)
      updatePreview('circle', { x1, y1, r })
    } else if (mode === 'rect') {
      updatePreview('rect', { x1, y1, x2, y2 })
    } else if (mode === 'line') {
      updatePreview('line', { x1, y1, x2, y2 })
    }
  }
  function mouseUp (e) {
    const x2 = e.nativeEvent.offsetX
    const y2 = e.nativeEvent.offsetY
    if (mode === 'circle') {
      const r = distance(x1, y1, x2, y2)
      addStep('circle', { x1, y1, r })
    } else if (mode === 'rect') {
      addStep('rect', { x1, y1, x2, y2 })
    } else if (mode === 'line') {
      addStep('line', { x1, y1, x2, y2 })
    } else if (mode === 'text') {
      addStep('text', { x1: x2, y1: y2 })
    }
    setPreview(null)
    x1 = null
  }
  function addStep (type, step) {
    prep(step, 'value')
    updatePicture(picture => {
      picture.steps.push({ id: nanoid(), type, ...step })
    })
  }
  function updatePreview (type, step) {
    prep(step, 'evaluated')
    setPreview({ id: 'preview', type, ...step })
  }
  const step = picture.steps[selectedStep]
  const updateStep = updater =>
    updatePicture(picture => {
      updater(picture.steps[selectedStep])
    })
  return (
    <Wrapper>
      <DomMessage>{getDomMsg(step, picture.data, updateStep)}</DomMessage>
      <Svg onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
        {generateParts(picture.steps.slice(0, selectedStep + 1))}
        {generateParts(preview && [preview])}
      </Svg>
    </Wrapper>
  )
}

// TODO;; stop depending on this className
const Wrapper = styled.div`
  & .scalar-val {
    display: inline-block;
  }
  height: calc(100vh - 191px);
  width: calc(100vw - 400px);
  position: relative;
`

const DomMessage = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
  width: 100%;
  text-align: center;
`

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`

const distance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

const prep = (step, name) => {
  for (const key in step) {
    step[key] = { [name]: step[key] }
  }
}
