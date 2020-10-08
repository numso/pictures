import React from 'react'
import styled from 'styled-components'

import { generateParts, getMsg } from '../common/drawing'
import { Panel } from '../common/panel'

export default function Steps ({ picture, selectedStep, setSelectedStep }) {
  return (
    <Panel title='Steps'>
      <Wrapper>
        {picture.steps.map((step, i, steps) => (
          <Item
            key={step.id}
            selected={selectedStep === i}
            onClick={() => setSelectedStep(i)}
          >
            <svg>{generateParts(steps.slice(0, i + 1), 1 / 9, 4)}</svg>
            <p>{getMsg(step)}</p>
          </Item>
        ))}
      </Wrapper>
    </Panel>
  )
}

const Wrapper = styled.ul`
  min-height: 300px;
  max-height: 420px;
`

const Item = styled.li`
  display: flex;
  padding: 8px 0;
  cursor: pointer;
  background: ${p => (p.selected ? '#a0af0b' : 'initial')};
  &:hover {
    background: ${p => (p.selected ? '#a0af0b' : 'rgba(0, 0, 0, 0.04)')};
  }

  & > svg {
    background: #fff;
    height: 100px;
    width: 150px;
    flex-shrink: 0;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
  }

  & > p {
    padding: 8px;
  }
`
