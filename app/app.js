import React from 'react'
import styled from 'styled-components'

import usePictureState from './use-picture-state'
import Pictures from './pictures'
import Data from './data'
import Steps from './steps'
import BigPicture from './big-picture'
import Measurements from './measurements'
import CheatSheet from './cheat-sheet'

export default function App () {
  const [drawMode, setDrawMode] = React.useState('line')
  // const [selectedPictureId, setSelectedPictureId] = React.useState(null)
  const [selectedStep, setSelectedStep] = React.useState(0)
  const pictureState = usePictureState()
  const picture = pictureState.pictures[pictureState.selected]
  React.useEffect(() => {
    setSelectedStep(picture.steps.length - 1)
  }, [picture.id, picture.steps.length])
  React.useEffect(() => {
    const deleteHandler = e => {
      // 39 === ' (apostrophe)
      if (e.keyCode !== 39) return
      pictureState.updatePicture(picture => {
        picture.steps.splice(selectedStep, 1)
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
      <Flex>
        <Sidebar>
          <Data
            picture={pictureState.pictures[pictureState.selected]}
            updatePicture={pictureState.updatePicture}
          />
          <Steps
            picture={pictureState.pictures[pictureState.selected]}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
          <Measurements />
        </Sidebar>

        <MainArea>
          <BigPicture
            mode={drawMode}
            picture={pictureState.pictures[pictureState.selected]}
            updatePicture={pictureState.updatePicture}
            selectedStep={selectedStep}
          />
          <CheatSheet mode={drawMode} setMode={setDrawMode} />
        </MainArea>
      </Flex>
    </div>
  )
}

const Flex = styled.div`
  display: flex;
  height: calc(100vh - 191px);
`

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  > * {
    transition: flex 200ms;
    flex: 1;
  }
  > *:hover {
    flex: 3;
  }
  width: 400px;
`

const MainArea = styled.div`
  position: relative;
`
