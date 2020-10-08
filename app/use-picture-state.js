import _ from 'lodash'
import { nanoid } from 'nanoid'
import React from 'react'
import { useImmer } from 'use-immer'

import evaluate from './data/evaluator'

const HEIGHT = window.innerHeight - 191

export default function usePictureState () {
  const [selected, setSelected] = React.useState(0)
  const [pictures, updatePictures] = useImmer(() => [
    resolve({
      id: nanoid(),
      title: 'Solar Data',
      steps: _.range(0, 12).map(i => ({
        id: nanoid(),
        type: 'rect',
        x1: { value: i * 60 + 4 },
        x2: { value: (i + 1) * 60 - 4 }, // TODO:: get columns worksing so i can just be a column num
        y1: { value: `${HEIGHT} - {a:3:${i}} / {a:3:max} * ${HEIGHT}` },
        y2: { value: HEIGHT }
      })),
      data: {
        scalars: [
          { id: 's:1', label: 'panels', value: 600 },
          { id: 's:2', label: 'kW / panel', value: 0.2 },
          { id: 's:3', label: 'power in kW', value: '{s:1} * {s:2}' }
        ],
        arrays: [
          {
            id: 'a:1',
            label: 'sun hours',
            value: [53, 86, 134, 155, 159, 155, 130, 143, 126, 112, 81, 65]
          },
          { id: 'a:2', label: 'energy in kWh', value: '{s:3} * {a:1}' },
          { id: 'a:3', label: 'energy in MWh', value: '{a:2} / 1000' }
        ]
      }
    }),
    resolve({
      id: nanoid(),
      title: 'Sine Wave',
      steps: [
        {
          id: nanoid(),
          type: 'circle',
          x1: { value: '{s:2}' },
          y1: { value: '{s:3}' },
          r: { value: 50 }
        }
      ],
      data: {
        scalars: [
          { id: 's:1', label: 'drag this number ->', value: 60 },
          { id: 's:2', label: 'x', value: '3 * {s:1}' },
          { id: 's:3', label: 'y', value: '400 + Math.sin( {s:1} / 10 ) * 100' }
        ],
        arrays: []
      }
    }),
    newPicture()
  ])

  return {
    selected,
    setSelected,
    selectedPicture: pictures[selected],
    pictures,
    addNew: () =>
      updatePictures(pictures => {
        pictures.push(newPicture())
      }),
    updatePictureTitle: (i, title) =>
      updatePictures(pictures => {
        pictures[i].title = title
      }),
    updatePicture: updater =>
      updatePictures(pictures => {
        updater(pictures[selected])
        resolve(pictures[selected])
      })
  }
}

function newPicture () {
  return resolve({
    id: nanoid(),
    title: 'untitled',
    steps: [],
    data: {
      scalars: [{ id: `s:${nanoid()}`, label: 'parameter', value: 1 }],
      arrays: [{ id: `a:${nanoid()}`, label: 'item', value: [1, 2, 3, 4, 5] }]
    }
  })
}

// --- Evaluation --------------------------------------------------------------

function resolve (picture) {
  doResolve(picture)
  return picture
}

function doResolve ({ data, steps }) {
  const ctx = _.mapValues(
    _.keyBy([...data.scalars, ...data.arrays], i => `{${i.id}}`),
    'value'
  )
  _.forEach(steps, ({ id, type, ...item }) => {
    for (const key in item) {
      ctx[`${id}:${key}`] = item[key].value
    }
  })
  const resolved = evaluate(ctx)
  _.forEach([...data.scalars, ...data.arrays], item => {
    item.evaluated = resolved[`{${item.id}}`]
  })
  _.forEach(steps, ({ id, type, ...item }) => {
    for (const key in item) {
      item[key].evaluated = resolved[`${id}:${key}`]
    }
  })
}
