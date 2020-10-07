import React from 'react'
import ReactDOM from 'react-dom'

import usePictureState from './use-picture-state'
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
  React.useEffect(() => {
    const deleteHandler = e => {
      // 39 === ' (apostrophe)
      if (e.keyCode !== 39) return
      pictureState.updatePicture(picture => {
        picture.steps.splice(picture.selectedStep, 1)
        if (picture.selectedStep >= picture.steps.length) {
          picture.selectedStep = picture.steps.length - 1
        }
      })
    }
    document.addEventListener('keypress', deleteHandler)
    return () => document.removeEventListener('keypress', deleteHandler)
  })
  return (
    <div>
      <Pictures
        selected={pictureState.selected}
        setSelected={pictureState.setSelected}
        pictures={pictureState.pictures}
        addNew={pictureState.addNew}
        setTitle={pictureState.updatePictureTitle}
      />

      <div
        style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}
      >
        <Data
          picture={pictureState.pictures[pictureState.selected]}
          updatePicture={pictureState.updatePicture}
        />
        <Steps
          picture={pictureState.pictures[pictureState.selected]}
          setSelected={pictureState.setSelectedStep}
        />
        <Measurements />
      </div>

      <div style={{ display: 'inline-block', paddingTop: 20 }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <BigPicture
            mode={drawMode}
            picture={pictureState.pictures[pictureState.selected]}
            updatePicture={pictureState.updatePicture}
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
