import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Tag from './tag'
import CreateTag from './create-tag'
import ScalarVal from './scalar-val'
import ArrayVal from './array-val'
import { Header, Container } from '../common/container'
import * as T from '../common/tag'

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
    updatePicture(picture => {
      picture.data[type].push({ label: 'item', value: '10' })
    })
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
      <TestBox>
        {stats.map(stat => {
          return (
            <div>
              <T.Basic draggable='true'>
                {stat.name} {item.label}
              </T.Basic>
              <span>{evaluator.round(stat.code(item.evaluated || []))}</span>
            </div>
          )
        })}
      </TestBox>
    )
  }

  var max = picture.data.arrays.reduce((memo, item) => {
    return Math.max(memo, getArr(item.evaluated).length)
  }, 0)
  var indices = _.range(1, Math.max(max + 1, 6))

  var scalarTags = picture.data.scalars.map((item, i) => (
    <Tag
      item={item}
      updateLabel={label => {
        updatePicture(picture => {
          picture.data.scalars[i].label = label
        })
      }}
    />
  ))

  var arrayTags = picture.data.arrays.map((item, i) => (
    <Tag
      item={item}
      updateLabel={label => {
        updatePicture(picture => {
          picture.data.arrays[i].label = label
        })
      }}
    >
      {getArrayStats(item)}
    </Tag>
  ))

  var scalarValues = picture.data.scalars.map((item, i) => (
    <ScalarVal
      key={item.id}
      pictureData={picture.data}
      item={item}
      updateItem={newItem => {
        updatePicture(picture => {
          picture.data.scalars[i].value = newItem
        })
      }}
    />
  ))
  var arrayValues = picture.data.arrays.map((item, i) => (
    <ArrayVal
      key={item.id}
      pictureData={picture.data}
      item={item}
      updateItem={newItem => {
        updatePicture(picture => {
          picture.data.arrays[i].value = newItem
        })
      }}
    />
  ))

  return (
    <div>
      <Header>Data</Header>
      <MyContainer>
        <div>
          {scalarTags}
          <CreateTag onClick={createScalar}>+</CreateTag>
          <CreateTag>column</CreateTag>
          {arrayTags}
          <CreateTag onClick={createArray}>+</CreateTag>
        </div>
        <Test1>
          {scalarValues}
          <Spacer />
          <ArrSection>
            <div>
              {indices.map(i => (
                <DataIndiceHeader>{i}</DataIndiceHeader>
              ))}
            </div>
            {arrayValues}
          </ArrSection>
        </Test1>
      </MyContainer>
    </div>
  )
}

const Spacer = styled.div`
  min-height: 22px;
`

const MyContainer = styled(Container)`
  min-height: 300px;
  max-height: 420px;
  overflow: auto;
  display: flex;
`

const TestBox = styled.div`
  box-shadow: 0 0 20px 2px;
  display: inline-block;
  padding: 6px;
  border-radius: 3px;
  position: absolute;
  background-color: white;
  z-index: 1;
`

const Test1 = styled.div`
  flex: 1;
  white-space: nowrap;
`

const ArrSection = styled.div`
  overflow: auto;
`

const DataIndiceHeader = styled.div`
  display: inline-block;
  font-size: 12px;
  width: 40px;
  height: 22px;
  border-left: 1px solid;
  text-align: center;
  background-color: #ccc;
  &:last-of-type {
    border-right: 1px solid;
  }
`
