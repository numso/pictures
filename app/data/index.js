import _ from 'lodash'
import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'

import Tag from './tag'
import CreateTag from './create-tag'
import ScalarVal from './scalar-val'
import ArrayVal from './array-val'
import { Panel } from '../common/panel'
import * as T from '../common/tag'

const getArr = item => (_.isArray(item) ? item : [])
const round = num => Math.round(num * 1000) / 1000

export default function Data ({ picture, updatePicture }) {
  function createScalar () {
    updatePicture(picture => {
      picture.data.scalars.push({
        id: `s:${nanoid()}`,
        label: 'new scalar',
        value: 10
      })
    })
  }

  function createArray () {
    updatePicture(picture => {
      picture.data.arrays.push({
        id: `a:${nanoid()}`,
        label: 'new array',
        value: [1, 2, 3]
      })
    })
  }

  function getArrayStats (item) {
    const stats = [
      { name: 'min', code: arr => Math.min.apply(null, arr) },
      {
        name: 'avg',
        code: arr => arr.reduce((memo, num) => memo + num, 0) / arr.length
      },
      { name: 'max', code: arr => Math.max.apply(null, arr) },
      { name: 'sum of', code: arr => arr.reduce((memo, num) => memo + num, 0) },
      { name: '# of', code: arr => arr.length }
    ]
    return (
      <TestBox>
        {stats.map((stat, i) => (
          <div key={i}>
            <T.Basic draggable='true'>
              {stat.name} {item.label}
            </T.Basic>
            <span>{round(stat.code(item.evaluated || []))}</span>
          </div>
        ))}
      </TestBox>
    )
  }

  const max = picture.data.arrays.reduce((memo, item) => {
    return Math.max(memo, getArr(item.evaluated).length)
  }, 0)
  const indices = _.range(1, Math.max(max + 1, 6))
  return (
    <Panel title='Data'>
      <Wrapper>
        <div>
          {picture.data.scalars.map((item, i) => (
            <Tag
              key={item.id}
              item={item}
              updateLabel={label => {
                updatePicture(picture => {
                  picture.data.scalars[i].label = label
                })
              }}
            />
          ))}
          <CreateTag onClick={createScalar}>+</CreateTag>
          <CreateTag>column</CreateTag>
          {picture.data.arrays.map((item, i) => (
            <Tag
              key={item.id}
              item={item}
              updateLabel={label => {
                updatePicture(picture => {
                  picture.data.arrays[i].label = label
                })
              }}
            >
              {getArrayStats(item)}
            </Tag>
          ))}
          <CreateTag onClick={createArray}>+</CreateTag>
        </div>
        <Test1>
          {picture.data.scalars.map((item, i) => (
            <ScalarVal
              key={item.id}
              pictureData={picture.data}
              item={item}
              onChange={value => {
                updatePicture(picture => {
                  picture.data.scalars[i].value = value
                })
              }}
            />
          ))}
          <Spacer />
          <ArrSection>
            <div>
              {indices.map(i => (
                <DataIndiceHeader key={i}>{i}</DataIndiceHeader>
              ))}
            </div>
            {picture.data.arrays.map((item, i) => (
              <ArrayVal
                key={item.id}
                pictureData={picture.data}
                item={item}
                onChange={value => {
                  updatePicture(picture => {
                    picture.data.arrays[i].value = value
                  })
                }}
              />
            ))}
          </ArrSection>
        </Test1>
      </Wrapper>
    </Panel>
  )
}

const Spacer = styled.div`
  min-height: 22px;
`

const Wrapper = styled.div`
  display: flex;
  min-height: 300px;
  max-height: 420px;
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
