import _ from 'lodash'
import React from 'react'

import ScalarVal from '../data/scalar-val'

export function generateParts (steps, scale = 1, fontSize = 16) {
  return _.map(steps, ({ type, x1, y1, x2, y2, r }) => {
    switch (type) {
      case 'circle': {
        return (
          <circle
            cx={scale * x1.evaluated}
            cy={scale * y1.evaluated}
            r={scale * r.evaluated}
            fill='#ccc'
          />
        )
      }
      case 'rect': {
        const x = Math.min(x1.evaluated, x2.evaluated)
        const y = Math.min(y1.evaluated, y2.evaluated)
        const w = Math.abs(x1.evaluated - x2.evaluated)
        const h = Math.abs(y1.evaluated - y2.evaluated)
        return (
          <rect
            x={scale * x}
            y={scale * y}
            width={scale * w}
            height={scale * h}
            fill='#ccc'
          />
        )
      }
      case 'line': {
        return (
          <line
            x1={scale * x1.evaluated}
            y1={scale * y1.evaluated}
            x2={scale * x2.evaluated}
            y2={scale * y2.evaluated}
            stroke='#ccc'
          />
        )
      }
      case 'text': {
        return (
          <text
            fontSize={fontSize}
            x={scale * x1.evaluated}
            y={scale * y1.evaluated}
            fill='#ccc'
          >
            Hi!
          </text>
        )
      }
    }
  })
}

function getMsgInner (val, step) {
  if (!step) return ''
  const { x1, x2, y1, y2, r } = step
  switch (step.type) {
    case 'circle': {
      return (
        <span>
          Draw circle around ( {val(x1, 'x1')} , {val(y1, 'y1')} ),{' '}
          {val(r, 'r')} px in radius.
        </span>
      )
    }
    case 'rect': {
      return (
        <span>
          Draw rect from ( {val(x1, 'x1')} , {val(y1, 'y1')} ),{' '}
          {round(x2.evaluated - x1.evaluated)} px horizontally,{' '}
          {round(y2.evaluated - y1.evaluated)} px vertically.
        </span>
      )
    }
    case 'line': {
      return (
        <span>
          Draw line from ( {val(x1, 'x1')} , {val(y1, 'y1')} ),{' '}
          {round(x2.evaluated - x1.evaluated)} px horizontally,{' '}
          {round(y2.evaluated - y1.evaluated)} px vertically.
        </span>
      )
    }
    case 'text': {
      return (
        <span>
          Draw text at ( {val(x1, 'x1')} , {val(y1, 'y1')} )
        </span>
      )
    }
  }
  return ''
}

const round = num => Math.round(num * 10) / 10
const getVal = item => round(item.evaluated)

function getDom (pictureData, updateStep) {
  return (item, key) => (
    <ScalarVal
      pictureData={pictureData}
      item={item}
      onChange={value =>
        updateStep(step => {
          step[key].value = value
        })
      }
    />
  )
}

export function getMsg (step) {
  return getMsgInner(getVal, step)
}

export function getDomMsg (step, pictureData, updateStep) {
  return getMsgInner(getDom(pictureData, updateStep), step)
}
