import _ from 'lodash'
import React from 'react'

import * as Tag from './tag'
import Dragger from '../data/dragger'

export function generateValueMarkup (item, updateItem, pictureData, parse) {
  const str = _.isArray(item?.value)
    ? JSON.stringify(item.value).replace(/[[,\]]/g, ' $& ')
    : '' + (item?.value || '')
  const chunks = str.split(/\s/)
  var map = getMap(pictureData)
  var re = /\{[as]:.*\}/

  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) return <Tag.Basic>{map[chunk]?.label}</Tag.Basic>
    if (!isNaN(parseFloat(chunk))) {
      return (
        <Dragger
          number={chunk}
          firstChunk={arr.slice(0, i).join(' ')}
          secondChunk={arr.slice(i + 1, arr.length).join(' ')}
          item={item}
          updateItem={updateItem}
          parse={parse}
        />
      )
    }
    return <span> {chunk} </span>
  })
}

function getMap ({ scalars, arrays }) {
  return _.keyBy([...scalars, ...arrays], i => `{${i.id}}`)
}
