import React from 'react'
import { component, handler } from 'omniscient-tools'

import PictureStore from './pictures/store'
import CheatSheetStore from './cheat-sheet/store'

import Pictures from './pictures'
import Data from './data'
import Steps from './steps'
import BigPicture from './big-picture'
import Measurements from './measurements'
import CheatSheet from './cheat-sheet'
import './common/style.css'

window.React = React

function load () {
  // optionally load all stores from a backend or localstorage or firebase or something.
}

// TODO:: should be able to pass in optional displayName to handler...
var Index = handler(load, function () {
  // When refactor is done (and you've chosen a better name than 'bigPictureStuff')
  // all the cursors should be passed into the app here instead of a random num.
  return <App foo={Math.random()} />
})

var App = component('App', function () {
  var curPicture = PictureStore.state.cursor('selectedPicture').get('current')
  var curPictureCursor = PictureStore.state.cursor('pictures').get(curPicture)
  var dataCursor = curPictureCursor.get('data')
  var stepsCursor = curPictureCursor.get('steps')
  var curStepSelectedCursor = curPictureCursor.get('selectedStep')
  var bigPictureStuff = curPictureCursor.get('bigPictureStuff')
  return (
    <div>
      <Pictures
        pictures={PictureStore.state.cursor('pictures')}
        selectedPicture={PictureStore.state.cursor('selectedPicture')}
      />

      <div
        style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}
      >
        <Data
          selectedPicture={PictureStore.state.cursor('selectedPicture')}
          pictureData={dataCursor}
        />
        <Steps steps={stepsCursor} selected={curStepSelectedCursor} />
        <Measurements />
      </div>

      <div style={{ display: 'inline-block', paddingTop: 20 }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <BigPicture
            mode={CheatSheetStore.state.cursor('mode')}
            steps={stepsCursor}
            bigPictureStuff={bigPictureStuff}
            selectedStep={curStepSelectedCursor}
            selectedPicture={PictureStore.state.cursor('selectedPicture')}
            pictureData={dataCursor}
          />
        </div>

        <div
          style={{ display: 'inline-block', position: 'absolute', right: 0 }}
        >
          <CheatSheet
            labels={CheatSheetStore.state.cursor('labels')}
            mode={CheatSheetStore.state.cursor('mode')}
          />
        </div>
      </div>
    </div>
  )
})

function render (a, b) {
  React.render(<Index />, document.body)
}

PictureStore.state.on('swap', render)
CheatSheetStore.state.on('swap', render)

render()

// just a quick test for removing steps
// should be moved somewhere else....
// also, keypress's should be paused while editing stuff
document.addEventListener('keypress', e => {
  if (e.keyCode === 39) {
    // ' (apostrophe)
    var curPicture = PictureStore.state.cursor('selectedPicture').get('current')
    var curPictureCursor = PictureStore.state.cursor('pictures').get(curPicture)
    var stepsCursor = curPictureCursor.get('steps')
    var selectedStep = curPictureCursor.get('selectedStep').get('current')
    stepsCursor = stepsCursor.remove(selectedStep)
    if (selectedStep >= stepsCursor.size) {
      curPictureCursor
        .get('selectedStep')
        .update('current', () => stepsCursor.size - 1)
    }
  }
})
