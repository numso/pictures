import React from 'react'

import { generateParts, getMsg } from '../common/drawing'

export default function Steps ({ picture, setSelected }) {
  function renderStep (s, i, steps) {
    var msg = getMsg(s)
    var svgParts = generateParts(steps.slice(0, i + 1), 1 / 9, 4)

    var style = {
      backgroundColor: 'white',
      height: 100,
      width: 150,
      display: 'inline-block',
      boxShadow: '0 0 20px 2px rgba(0,0,0,0.5)'
    }

    var item = {
      padding: '10px 0',
      cursor: 'pointer'
    }

    if (picture.selectedStep === i) {
      item.backgroundColor = '#a0af0b'
    }

    return (
      <li style={item} onClick={() => setSelected(i)}>
        <svg style={style}>{svgParts}</svg>
        <p style={{ float: 'right', width: 240 }}>{msg}</p>
      </li>
    )
  }

  return (
    <div>
      <div className='header'>Steps</div>
      <div className='container --data'>
        <ul>{picture.steps.map(renderStep)}</ul>
      </div>
    </div>
  )
}
