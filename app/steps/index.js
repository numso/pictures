import React from 'react'
import styled, { css } from 'styled-components'

import { generateParts, getMsg } from '../common/drawing'
import { Header, Container } from '../common/container'

export default function Steps ({ picture, setSelected }) {
  return (
    <div>
      <Header>Steps</Header>
      <MyContainer>
        <ul>
          {picture.steps.map((s, i, steps) => (
            <Item
              selected={picture.selectedStep === i}
              onClick={() => setSelected(i)}
            >
              <svg>{generateParts(steps.slice(0, i + 1), 1 / 9, 4)}</svg>
              <p>{getMsg(s)}</p>
            </Item>
          ))}
        </ul>
      </MyContainer>
    </div>
  )
}

const MyContainer = styled(Container)`
  min-height: 300px;
  max-height: 420px;
  overflow: auto;
`

const Item = styled.li`
  padding: 10px 0;
  cursor: pointer;
  ${p =>
    p.selected &&
    css`
      background: #a0af0b;
    `}

  & > svg {
    background: white;
    height: 100px;
    width: 150px;
    display: inline-block;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
  }

  & > p {
    float: right;
    width: 240px;
  }
`
