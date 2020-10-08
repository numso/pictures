import _ from 'lodash'
import React from 'react'

import * as Tag from './tag'
import Dragger from '../data/dragger'

export function generateValueMarkup (item, onChange, pictureData, parse) {
  const str = _.isArray(item?.value)
    ? JSON.stringify(item.value).replace(/[[,\]]/g, ' $& ')
    : '' + (item?.value || '')
  const chunks = str.split(/\s/)
  const keyMap = getKeyedData(pictureData)
  const re = /\{[as]:.*\}/
  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) return <Tag.Basic>{keyMap[chunk]?.label}</Tag.Basic>
    if (!isNaN(parseFloat(chunk))) {
      return (
        <Dragger
          number={chunk}
          prefix={arr.slice(0, i).join(' ')}
          suffix={arr.slice(i + 1, arr.length).join(' ')}
          onChange={onChange}
          parse={parse}
        />
      )
    }
    return <span> {chunk} </span>
  })
}

function getKeyedData ({ scalars, arrays }) {
  return _.keyBy([...scalars, ...arrays], i => `{${i.id}}`)
}
