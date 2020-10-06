import React from 'react'

import ContentEditable from '../common/content-editable'
import { generateParts } from '../common/drawing'

export default function Picture ({
  picture,
  selected,
  setSelected,
  updateTitle
}) {
  const [[editing, tempTitle], setState] = React.useState([false, ''])

  function onMouseUp () {
    setState([true, picture.title])
  }

  function onChange (title) {
    setState([true, title])
  }

  function onFinish (title) {
    setState([false, ''])
    updateTitle(title)
  }

  var classes = selected ? 'picture --selected' : 'picture'

  return (
    <div>
      <div className={classes} onClick={setSelected}>
        <svg width={220}>{generateParts(picture.steps, 1 / 6, 5)}</svg>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 15 }}>
        {editing ? (
          <ContentEditable
            text={tempTitle}
            onChange={onChange}
            onFinish={onFinish}
          />
        ) : (
          <div onMouseUp={onMouseUp}>{picture.title}</div>
        )}
      </div>
    </div>
  )
}
