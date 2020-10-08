import React from 'react'
import styled from 'styled-components'

import Picture from './picture'
import { Panel } from '../common/panel'

export default function Pictures ({
  selected,
  setSelected,
  pictures,
  addNew,
  setTitle
}) {
  return (
    <Panel title='Pictures'>
      <Flex>
        {pictures.map((picture, i) => (
          <Picture
            key={picture.id}
            picture={picture}
            selected={selected === i}
            setSelected={() => setSelected(i)}
            updateTitle={title => setTitle(i, title)}
          />
        ))}
        <NewPicture onClick={addNew}>+</NewPicture>
      </Flex>
    </Panel>
  )
}

const Flex = styled.div`
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3) inset;
  display: flex;
  align-items: center;
`

const NewPicture = styled.button`
  background-color: #d7dce5;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border: 1px solid #888;
  cursor: pointer;
  &:hover {
    background-color: #c2cad8;
  }
  &:active {
    background-color: #afb8c8;
  }
`
