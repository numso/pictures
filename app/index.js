import React from 'react'
import ReactDOM from 'react-dom'

import usePictureState from './use-picture-state'

import PictureStore from './pictures/store'

import Pictures from './pictures'
import Data from './data'
import Steps from './steps'
import BigPicture from './big-picture'
import Measurements from './measurements'
import CheatSheet from './cheat-sheet'
import './common/style.css'

function App () {
  const [drawMode, setDrawMode] = React.useState('line')
  const pictureState = usePictureState()

  var curPicture = PictureStore.state.cursor('selectedPicture').get('current')
  var curPictureCursor = PictureStore.state.cursor('pictures').get(curPicture)
  var dataCursor = curPictureCursor.get('data')
  var stepsCursor = curPictureCursor.get('steps')
  var curStepSelectedCursor = curPictureCursor.get('selectedStep')
  var bigPictureStuff = curPictureCursor.get('bigPictureStuff')
  return (
    <div>
      <Pictures
        selected={pictureState.selected}
        setSelected={pictureState.setSelected}
        pictures={pictureState.pictures}
        addNew={pictureState.addNew}
        updatePicture={pictureState.updatePicture}
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
            mode={drawMode}
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
          <CheatSheet mode={drawMode} setMode={setDrawMode} />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

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
