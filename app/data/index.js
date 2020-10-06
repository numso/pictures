import _ from 'lodash'
import React from 'react'

import Tag from './tag'
import CreateTag from './create-tag'
import ScalarVal from './scalar-val'
import ArrayVal from './array-val'
import './style.css'

import * as evaluator from './evaluator'

function getArr (item) {
  if (item && _.isArray(item)) return item
  return []
}

export default function Data ({ picture, updatePicture }) {
  console.log('-------RENDER--------')

  function createScalar () {
    createNew('scalars')
  }

  function createArray () {
    createNew('arrays')
  }

  function createNew (type) {
    picture.data[type].push({ label: 'item', value: '10' })
    // TODO;; resolve this
  }

  function getArrayStats (item) {
    var stats = [
      {
        name: 'min',
        code: function (arr) {
          return Math.min.apply(this, arr)
        }
      },
      {
        name: 'avg',
        code: function (arr) {
          return (
            arr.reduce(function (memo, num) {
              return memo + num
            }, 0) / arr.length
          )
        }
      },
      {
        name: 'max',
        code: function (arr) {
          return Math.max.apply(this, arr)
        }
      },
      {
        name: 'sum of',
        code: function (arr) {
          return arr.reduce(function (memo, num) {
            return memo + num
          }, 0)
        }
      },
      {
        name: '# of',
        code: function (arr) {
          return arr.length
        }
      }
    ]
    return (
      <div className='test-box'>
        {stats.map(stat => {
          return (
            <div>
              <div className='tag' draggable='true'>
                {stat.name} {item.label}
              </div>
              <span>{evaluator.round(stat.code(item.evaluated || []))}</span>
            </div>
          )
        })}
      </div>
    )
  }

  var max = picture.data.arrays.reduce((memo, item) => {
    return Math.max(memo, getArr(item.evaluated).length)
  }, 0)
  var indices = _.range(1, Math.max(max + 1, 6))

  var scalarTags = picture.data.scalars.map(item => (
    <Tag
      item={item}
      updateLabel={() => {
        throw new Error('Not implemented')
      }}
    />
  ))

  var arrayTags = picture.data.arrays.map(item => (
    <Tag
      item={item}
      updateLabel={() => {
        throw new Error('Not implemented')
      }}
    >
      {getArrayStats(item)}
    </Tag>
  ))

  var scalarValues = picture.data.scalars.map(item => (
    <ScalarVal
      pictureData={picture.data}
      // updatePicture={updatePicture}
      item={item}
    />
  ))
  var arrayValues = picture.data.arrays.map(item => (
    <ArrayVal
      pictureData={picture.data}
      // updatePicture={updatePicture}
      item={item}
    />
  ))

  return (
    <div className='data'>
      <div className='header'>Data</div>
      <div className='container --data --flex'>
        <div>
          {scalarTags}
          <CreateTag onClick={createScalar}>+</CreateTag>
          <CreateTag>column</CreateTag>
          {arrayTags}
          <CreateTag onClick={createArray}>+</CreateTag>
        </div>
        <div className='test-1'>
          {scalarValues}
          <div style={{ minHeight: 22 }}></div>
          <div className='arr-section'>
            <div>
              {indices.map(i => (
                <div className='data__indice --header'>{i}</div>
              ))}
            </div>
            {arrayValues}
          </div>
        </div>
      </div>
    </div>
  )
}
