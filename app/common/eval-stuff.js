import _ from 'lodash'
import React from 'react'

import * as Tag from './tag'
import Dragger from '../data/dragger'

export function generateValueMarkup (item, updateItem, pictureData) {
  const chunks = ('' + (item?.value || '')).split(/\s/)
  var map = getMap(pictureData)
  var re = /[as]_[0-9]*/

  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) return <Tag.Basic>{map[chunk]}</Tag.Basic>
    if (!isNaN(parseFloat(chunk))) {
      var firstChunk = arr.slice(0, i).join(' ')
      var secondChunk = arr.slice(i + 1, arr.length).join(' ')
      return (
        <Dragger
          number={chunk}
          firstChunk={firstChunk}
          secondChunk={secondChunk}
          item={item}
          updateItem={updateItem}
        />
      )
    }
    return <span> {chunk} </span>
  })
}

export function getMap (pictureData) {
  var obj = {}
  _.forEach(pictureData.scalars, item => {
    obj[item.id] = item.label
  })
  _.forEach(pictureData.arrays, item => {
    obj[item.id] = item.label
  })
  return obj
}
