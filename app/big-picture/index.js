import React from 'react'
import styled from 'styled-components'

import { generateParts, getDomMsg } from '../common/drawing'

var startx = null
var starty

export default function BigPicture ({ mode, picture, updatePicture }) {
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
      setPreview('circle', { type: 'circle', x1: startx, y1: starty, r: dist })
    } else if (mode === 'rect') {
      setPreview('rect', {
        type: 'rect',
        x1: startx,
        y1: starty,
        x2: endx,
        y2: endy
      })
    } else if (mode === 'line') {
      setPreview('line', {
        type: 'line',
        x1: startx,
        y1: starty,
        x2: endx,
        y2: endy
      })
    }
  }

  function mouseUp (e) {
    var endx = e.nativeEvent.offsetX
    var endy = e.nativeEvent.offsetY
    if (mode === 'circle') {
      var dist = distance(startx, starty, endx, endy)
      removePreview('circle')
      addStep({ type: 'circle', x1: startx, y1: starty, r: dist })
    } else if (mode === 'rect') {
      removePreview('rect')
      addStep({ type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'line') {
      removePreview('line')
      addStep({ type: 'line', x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'text') {
      addStep({ type: 'text', x1: endx, y1: endy })
    }
    startx = null
  }

  function distance (x, y, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2))
  }

  function addStep (step) {
    for (var key in step) {
      if (key !== 'type') step[key] = { value: step[key] }
    }
    updatePicture(picture => {
      picture.steps.push(step)
      picture.selectedStep = picture.steps.length - 1
    })
  }

  function setPreview (key, preview) {
    for (var _key in preview) {
      if (_key !== 'type') preview[_key] = { evaluated: preview[_key] }
    }
    updatePicture(picture => {
      picture.bigPictureStuff.previews[key] = preview
    })
  }

  function removePreview (key) {
    updatePicture(picture => {
      delete picture.bigPictureStuff.previews[key]
    })
  }

  var svgParts = generateParts(picture.steps.slice(0, picture.selectedStep + 1))
  var previewParts = generateParts(picture.bigPictureStuff.previews)

  var step = picture.steps[picture.selectedStep]

  const updateStep = updater =>
    updatePicture(picture => {
      updater(picture.steps[picture.selectedStep])
    })

  return (
    <Wrapper>
      <div style={{ textAlign: 'center', height: 18 }}>
        {getDomMsg(step, picture.data, updateStep)}
      </div>
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
