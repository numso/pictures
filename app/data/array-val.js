import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

function getArr (item) {
  if (item && _.isArray(item)) return item
  return []
}

export default function ArrayValue ({ item, updateItem, pictureData }) {
  const [editing, setEditing] = React.useState(false)
  const onFinish = val => {
    updateItem(val)
    setEditing(false)
  }
  return editing ? (
    <ArrayVal>
      <ContentEditable
        text={item.value}
        onChange={updateItem}
        onFinish={onFinish}
      />
    </ArrayVal>
  ) : (
    <ArrayVal onClick={() => setEditing(true)}>
      <Evaluated>
        {getArr(item?.evaluated).map(item => (
          <DataIndice>{item}</DataIndice>
        ))}
      </Evaluated>
      <Value>
        {evalStuff.generateValueMarkup(item, updateItem, pictureData)}
      </Value>
    </ArrayVal>
  )
}

const ArrayVal = styled.div`
  min-height: 22px;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`

const Evaluated = styled.div`
  ${ArrayVal}:hover & {
    display: none;
  }
`

const Value = styled.div`
  display: none;
  ${ArrayVal}:hover & {
    display: block;
  }
  height: 25px;
`

const DataIndice = styled.div`
  display: inline-block;
  font-size: 12px;
  width: 40px;
  height: 22px;
  border-left: 1px solid;
  text-align: center;
  &:last-of-type {
    border-right: 1px solid;
  }
`
