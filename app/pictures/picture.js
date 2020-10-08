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
  const onFinish = title => {
    setState([false, ''])
    updateTitle(title)
  }

  return (
    <Wrapper selected={selected} onClick={setSelected}>
      <svg>{generateParts(picture.steps, 1 / 9, 4)}</svg>
      {editing ? (
        <ContentEditable
          text={tempTitle}
          onChange={title => setState([true, title])}
          onFinish={onFinish}
        />
      ) : (
        <div onMouseUp={() => setState([true, picture.title])}>
          {picture.title}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  padding: 16px 8px 8px;
  & > svg {
    background: #fff;
    margin-bottom: 4px;
    cursor: pointer;
    height: 100px;
    width: 150px;
    flex-shrink: 0;
    box-shadow: 0 0 20px 2px
      ${p => (p.selected ? 'rgb(30, 79, 234)' : 'rgba(0, 0, 0, 0.3)')};
  }
`
