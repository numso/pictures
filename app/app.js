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
      <Flex>
        <Sidebar>
          <Data
            picture={pictureState.pictures[pictureState.selected]}
            updatePicture={pictureState.updatePicture}
          />
          <Steps
            picture={pictureState.pictures[pictureState.selected]}
            setSelected={pictureState.setSelectedStep}
          />
          <Measurements />
        </Sidebar>

        <MainArea>
          <BigPicture
            mode={drawMode}
            picture={pictureState.pictures[pictureState.selected]}
            updatePicture={pictureState.updatePicture}
          />
          <CheatSheet mode={drawMode} setMode={setDrawMode} />
        </MainArea>
      </Flex>
    </div>
  )
}

const Flex = styled.div`
  display: flex;
`

const Sidebar = styled.div`
  width: 400px;
`

const MainArea = styled.div`
  flex: 1;
  padding-top: 16px;
  position: relative;
`
