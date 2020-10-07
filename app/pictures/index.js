import React from 'react'
import styled from 'styled-components'

import Picture from './picture'
import { Header, Container } from '../common/container'

export default function Pictures ({
  selected,
  setSelected,
  pictures,
  addNew,
  setTitle
}) {
  return (
    <div>
      <Header>Pictures</Header>
      <MyContainer>
        {pictures.map((picture, i) => (
          <Picture
            picture={picture}
            selected={selected === i}
            setSelected={() => setSelected(i)}
            updateTitle={title => setTitle(i, title)}
          />
        ))}
        <NewPicture onClick={addNew}>
          <span>+</span>
        </NewPicture>
      </MyContainer>
    </div>
  )
}

const MyContainer = styled(Container)`
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3) inset;
  display: flex;
`

const NewPicture = styled.div`
  background-color: #d7dce5;
  border-radius: 100px;
  padding: 20px;
  height: 0;
  width: 0;
  display: inline-block;
  border: 1px solid #888;
  position: relative;
  vertical-align: top;
  margin-top: 70px;
  cursor: pointer;

  &:hover {
    background-color: #c2cad8;
  }

  &:active {
    background-color: #afb8c8;
  }

  & > span {
    color: #888;
    position: relative;
    top: -9px;
    left: -5px;
  }
`
