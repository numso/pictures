import React from 'react'
import styled from 'styled-components'

import ContentEditable from '../common/content-editable'
import * as T from '../common/tag'

export default function Tag ({ updateLabel, item, children }) {
  const [editing, setEditing] = React.useState(false)
  const [showChildren, setShowChildren] = React.useState(false)
  const onFinish = label => {
    updateLabel(label)
    setEditing(false)
  }
  return editing ? (
    <MyT>
      <ContentEditable
        text={item.label}
        onChange={updateLabel}
        onFinish={onFinish}
      />
    </MyT>
  ) : (
    <Flex>
      <T.Basic
        draggable='true'
        onDragStart={e => e.dataTransfer.setData('text/plain', `{${item.id}}`)}
        onMouseUp={() => setEditing(true)}
      >
        {item.label}
      </T.Basic>
      {children && <T.Arrow onClick={() => setShowChildren(a => !a)} />}
      {showChildren && children}
    </Flex>
  )
}

const MyT = styled(T.Basic)`
  color: black;
`
const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
