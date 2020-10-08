import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'

import { generateParts, getDomMsg } from '../common/drawing'

var startx = null
var starty

export default function BigPicture ({
  mode,
  picture,
  selectedStep,
  updatePicture
}) {
  function mouseDown (e) {
    startx = e.nativeEvent.offsetX
    starty = e.nativeEvent.offsetY
  }

  function mouseMove (e) {
    if (startx === null) return
    var endx = e.nativeEvent.offsetX
    var endy = e.nativeEvent.offsetY
    if (mode === 'circle') {
      var dist = distance(startx, starty, endx, endy)
      updatePreview('circle', { x1: startx, y1: starty, r: dist })
    } else if (mode === 'rect') {
      updatePreview('rect', { x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'line') {
      updatePreview('line', { x1: startx, y1: starty, x2: endx, y2: endy })
    }
  }

  function mouseUp (e) {
    var endx = e.nativeEvent.offsetX
    var endy = e.nativeEvent.offsetY
    if (mode === 'circle') {
      var dist = distance(startx, starty, endx, endy)
      addStep('circle', { x1: startx, y1: starty, r: dist })
    } else if (mode === 'rect') {
      addStep('rect', { x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'line') {
      addStep('line', { x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'text') {
      addStep('text', { x1: endx, y1: endy })
    }
    setPreview(null)
    startx = null
  }

  function distance (x, y, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2))
  }

  function prep (step, name) {
    for (var key in step) {
      step[key] = { [name]: step[key] }
    }
  }

  function addStep (type, step) {
    prep(step, 'value')
    updatePicture(picture => {
      picture.steps.push({ id: nanoid(), type, ...step })
    })
  }

  const [preview, setPreview] = React.useState(null)

  function updatePreview (type, step) {
    prep(step, 'evaluated')
    setPreview({ id: 'preview', type, ...step })
  }

  var svgParts = generateParts(picture.steps.slice(0, selectedStep + 1))
  var previewParts = generateParts(preview && [preview])

  var step = picture.steps[selectedStep]

  const updateStep = updater =>
    updatePicture(picture => {
      updater(picture.steps[selectedStep])
    })

  return (
    <Wrapper>
      <DomMessage>{getDomMsg(step, picture.data, updateStep)}</DomMessage>
      <Container>
        <svg
          width={720}
          height={900}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove}
        >
          {svgParts}
          {previewParts}
        </svg>
      </Container>
    </Wrapper>
  )
}

// TODO;; stop depending on this className
const Wrapper = styled.div`
  & .scalar-val {
    display: inline-block;
  }
`

const Container = styled.div`
  width: 720px;
  height: 900px;
`

const DomMessage = styled.div`
  text-align: center;
  height: 18px;
`
