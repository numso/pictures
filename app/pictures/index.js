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
      <Outer>
        <Flex>
          <Spacer w='8px' />
          {pictures.map((picture, i) => (
            <Picture
              key={picture.id}
              picture={picture}
              selected={selected === i}
              setSelected={() => setSelected(i)}
              updateTitle={title => setTitle(i, title)}
            />
          ))}
          <Spacer w='8px' />
          <NewPicture onClick={addNew}>+</NewPicture>
          <Spacer w='16px' />
        </Flex>
      </Outer>
    </Panel>
  )
}

const Outer = styled.div`
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3) inset;
  overflow: auto;
  height: 165px;
`

const Spacer = styled.div`
  flex-shrink: 0;
  height: 1px;
  width: ${p => p.w};
`

const Flex = styled.div`
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
