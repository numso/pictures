import _ from 'lodash'
import React from 'react'
import { useImmer } from 'use-immer'

import * as evaluator from './data/evaluator'

export default function usePictureState () {
  const [selected, setSelected] = React.useState(0)
  const [pictures, updatePictures] = useImmer(() => [
    resolve({
      title: 'Solar Data',
      steps: _.range(0, 12).map(i => ({
        type: 'rect',
        x1: { value: i * 60 + 4 },
        x2: { value: (i + 1) * 60 - 4 }, // TODO:: get columns worksing so i can just be a column num
        y1: { value: `900 - a_3[${i}] / ar_3_max * 900` },
        y2: { value: 900 }
      })),
      selectedStep: 11,
      bigPictureStuff: { msg: '', previews: {} },
      data: {
        scalars: [
          { label: 'panels', value: '600' },
          { label: 'kW / panel', value: '0.2' },
          { label: 'power in kW', value: 's_1 * s_2' }
        ],
        arrays: [
          {
            label: 'sun hours',
            value: '[ 53, 86, 134, 155, 159, 155, 130, 143, 126, 112, 81, 65 ]'
          },
          { label: 'energy in kWh', value: 's_3 * a_1' },
          { label: 'energy in MWh', value: 'a_2 / 1000' }
        ],
        scalars_id: 1,
        arrays_id: 1
      }
    }),
    resolve({
      title: 'Sine Wave',
      steps: [
        {
          type: 'circle',
          x1: { value: 's_2' },
          y1: { value: 's_3' },
          r: { value: 50 }
        }
      ],
      selectedStep: 1,
      bigPictureStuff: { msg: '', previews: {} },
      data: {
        scalars: [
          { label: 'drag me', value: '60' },
          { label: 'x', value: '3 * s_1' },
          { label: 'y', value: '400 + Math.sin( s_1 / 10) * 100' }
        ],
        arrays: [],
        scalars_id: 1,
        arrays_id: 1
      }
    }),
    newPicture()
  ])

  return {
    selected,
    setSelected,
    pictures,
    addNew: () =>
      updatePictures(pictures => {
        pictures.push(newPicture())
      }),
    updatePicture: (i, updater) =>
      updatePictures(pictures => {
        updater(pictures[i])
      })
  }
}

function newPicture () {
  return resolve({
    title: 'untitled',
    steps: [],
    selectedStep: 0,
    bigPictureStuff: { msg: '', previews: {} },
    data: {
      scalars: [{ label: 'parameter', value: '1' }],
      arrays: [{ label: 'item', value: '[1,2,3,4,5]' }],
      scalars_id: 1,
      arrays_id: 1
    }
  })
}

// --- Evaluation --------------------------------------------------------------

// run this function: 1) on page load, 2) on picture create, 3) on every update to picture
function resolve (picture) {
  giveIDs(picture.data)
  evaluate(picture.data, picture.steps)
  return picture
}

function giveIDs (data) {
  for (var i = 0; i < data.scalars.length; i++) {
    var item = data.scalars[i]
    if (!item.id) item.id = `s_${data.scalars_id++}`
  }

  for (var i = 0; i < data.arrays.length; i++) {
    var item = data.arrays[i]
    if (!item.id) item.id = `a_${data.arrays_id++}`
  }
}

function evaluate (dataCursor, stepsCursor) {
  var ctx = {}
  for (var i = 0; i < dataCursor.scalars.length; i++) {
    var item = dataCursor.scalars[i]
    ctx[item.id] = item.value
  }
  for (var i = 0; i < dataCursor.arrays.length; i++) {
    var item = dataCursor.arrays[i]
    ctx[item.id] = item.value
  }
  for (var i = 0; i < stepsCursor.length; i++) {
    var item = stepsCursor[i]
    for (const key in item) {
      if (key !== 'type') ctx[`step-${i}-${key}`] = item[key].value
    }
  }
  var data = evaluator.check(ctx)
  for (var i = 0; i < dataCursor.scalars.length; i++) {
    var item = dataCursor.scalars[i]
    var id = item.id
    item.evaluated = data[id]
  }
  for (var i = 0; i < dataCursor.arrays.length; i++) {
    var item = dataCursor.arrays[i]
    var id = item.id
    item.evaluated = data[id]
  }
  for (var i = 0; i < stepsCursor.length; i++) {
    var item = stepsCursor[i]
    for (const key in item) {
      if (key !== 'type') item[key].evaluated = data[`step-${i}-${key}`]
    }
  }
}
