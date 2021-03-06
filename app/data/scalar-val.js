import React from 'react'
import styled from 'styled-components'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

export default function ScalarValue ({ item, onChange, pictureData }) {
  const [editing, setEditing] = React.useState(false)
  const onFinish = val => {
    onChange(val)
    setEditing(false)
  }
  return editing ? (
    <ScalarVal>
      <ContentEditable
        text={item.value}
        onChange={onChange}
        onFinish={onFinish}
      />
    </ScalarVal>
  ) : (
    <ScalarVal onClick={() => setEditing(true)}>
      <Evaluated>{item?.evaluated}</Evaluated>
      <Value>
        {evalStuff.generateValueMarkup(item, onChange, pictureData, item => {
          const num = parseFloat(item)
          return isNaN(num) ? item : num
        })}
      </Value>
    </ScalarVal>
  )
}

const ScalarVal = styled.div.attrs({ className: 'scalar-val' })`
  min-height: 22px;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`

const Value = styled.div`
  display: none;
  ${ScalarVal}:hover & {
    display: block;
  }
`
const Evaluated = styled.div`
  ${ScalarVal}:hover & {
    display: none;
  }
`
