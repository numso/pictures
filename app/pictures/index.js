import React from 'react'
import styled from 'styled-components'

import Picture from './picture'
import './style.css'

export default function Pictures ({
  selected,
  setSelected,
  pictures,
  addNew,
  setTitle
}) {
  return (
    <div>
      <div className='header'>Pictures</div>
      <div className='container --pictures'>
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
      </div>
    </div>
  )
}

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
