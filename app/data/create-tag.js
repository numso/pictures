import React from 'react'

import * as Tag from '../common/tag'

export default function CreateTag ({ onClick, children }) {
  return (
    <div>
      <Tag.Create as='span' onClick={onClick}>
        {children}
      </Tag.Create>
    </div>
  )
}
