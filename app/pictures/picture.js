import React from 'react'
import styled from 'styled-components'

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

  return (
    <div>
      <Wrapper selected={selected} onClick={setSelected}>
        <svg width={220}>{generateParts(picture.steps, 1 / 6, 5)}</svg>
      </Wrapper>
      <Label>
        {editing ? (
          <ContentEditable
            text={tempTitle}
            onChange={onChange}
            onFinish={onFinish}
          />
        ) : (
          <div onMouseUp={onMouseUp}>{picture.title}</div>
        )}
      </Label>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 20px;
  margin-bottom: 5px;
  display: inline-block;
  background-color: white;
  width: 220px;
  height: 150px;
  box-shadow: 0 0 20px 2px
    ${p => (p.selected ? 'rgb(30, 79, 234)' : 'rgba(0, 0, 0, 0.3)')};
  cursor: pointer;
`

const Label = styled.div`
  text-align: center;
  margin-bottom: 15px;
`
