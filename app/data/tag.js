import React from 'react'
import styled from 'styled-components'

import ContentEditable from '../common/content-editable'
import * as T from '../common/tag'

export default function Tag ({ updateLabel, item, children }) {
  const [editing, setEditing] = React.useState(false)
  const [showChildren, setShowChildren] = React.useState(false)
  const TagComponent = children ? T.Array : T.Basic
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
    <div>
      <TagComponent
        draggable='true'
        onDragStart={e => e.dataTransfer.setData('text/plain', `{${item.id}}`)}
        onMouseUp={() => setEditing(true)}
      >
        {item.label}
      </TagComponent>
      {children && <T.Arrow onClick={() => setShowChildren(a => !a)} />}
      {showChildren && children}
    </div>
  )
}

const MyT = styled(T.Basic)`
  color: black;
`
