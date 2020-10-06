import _ from 'lodash'
import React from 'react'

import Dragger from '../data/dragger'

export function generateValueMarkup (val, item, pictureData) {
  val = '' + val
  var map = getMap(pictureData)
  var re = /[as]_[0-9]*/
  var chunks = val.split(/\s/)

  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) {
      return <div className='tag'>{map[chunk]}</div>
    }
    if (!isNaN(parseFloat(chunk))) {
      var firstChunk = arr.slice(0, i).join(' ')
      var secondChunk = arr.slice(i + 1, arr.length).join(' ')
      return (
        <Dragger
          number={chunk}
          firstChunk={firstChunk}
          secondChunk={secondChunk}
          item={item}
        />
      )
    }
    return <span> {chunk} </span>
  })
}

export function getMap (pictureData) {
  var obj = {}
  for (var i = 0; i < pictureData.scalars.size; i++) {
    var item = pictureData.scalars[i]
    obj[item.id] = item.label
  }
  for (var i = 0; i < pictureData.arrays.size; i++) {
    var item = pictureData.arrays[i]
    obj[item.id] = item.label
  }
  return obj
}
