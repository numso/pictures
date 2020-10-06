import _ from 'lodash'
import React from 'react'

import ScalarVal from '../data/scalar-val'

export function generateParts (steps, proportion = 1, fontSize = 16) {
  return _.map(steps, s => {
    switch (s.type) {
      case 'circle':
        return (
          <circle
            cx={proportion * s.x1.evaluated}
            cy={proportion * s.y1.evaluated}
            r={proportion * s.r.evaluated}
            fill='#cacaca'
          />
        )
      case 'rect':
        var x = Math.min(s.x1.evaluated, s.x2.evaluated)
        var y = Math.min(s.y1.evaluated, s.y2.evaluated)
        var w = Math.abs(s.x1.evaluated - s.x2.evaluated)
        var h = Math.abs(s.y1.evaluated - s.y2.evaluated)
        return (
          <rect
            x={proportion * x}
            y={proportion * y}
            width={proportion * w}
            height={proportion * h}
            fill='#cacaca'
          />
        )
      case 'line':
        return (
          <line
            x1={proportion * s.x1.evaluated}
            y1={proportion * s.y1.evaluated}
            x2={proportion * s.x2.evaluated}
            y2={proportion * s.y2.evaluated}
            stroke='#cacaca'
          />
        )
      case 'text':
        return (
          <text
            fontSize={fontSize}
            x={proportion * s.x1.evaluated}
            y={proportion * s.y1.evaluated}
            fill='#cacaca'
          >
            Hi!
          </text>
        )
    }
  })
}

function getMsgInner (val, s) {
  if (!s) return ''
  var x1 = s.x1
  var x2 = s.x2
  var y1 = s.y1
  var y2 = s.y2
  var r = s.r
  switch (s.type) {
    case 'circle':
      return (
        <span>
          Draw circle around ( {val(x1)} , {val(y1)} ), {val(r)} px in radius.
        </span>
      )
    case 'rect':
      return (
        <span>
          Draw rect from ( {val(x1)} , {val(y1)} ), {getVal(x2) - getVal(x1)} px
          horizontally, {getVal(y2) - getVal(y1)} px vertically.
        </span>
      )
    case 'line':
      return (
        <span>
          Draw line from ( {val(x1)} , {val(y1)} ), {getVal(x2) - getVal(x1)} px
          horizontally, {getVal(y2) - getVal(y1)} px vertically.
        </span>
      )
    case 'text':
      return (
        <span>
          Draw text at ( {val(x1)} , {val(y1)} )
        </span>
      )
  }
  return ''
}

function getVal (numCursor) {
  return round(numCursor.evaluated)
}

function getDom (pictureData, updatePicture) {
  return numCursor => (
    <ScalarVal
      pictureData={pictureData}
      updatePicture={updatePicture}
      item={numCursor}
    />
  )
}

function round (num, mult = 10) {
  return Math.floor(num * mult) / mult
}

export function getMsg (s) {
  return getMsgInner(getVal, s)
}

export function getDomMsg (s, pictureData, updatePicture) {
  return getMsgInner(getDom(pictureData, updatePicture), s)
}
