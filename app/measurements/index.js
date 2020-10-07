import React from 'react'
import styled from 'styled-components'

import { Panel } from '../common/panel'

export default function Measurements () {
  return (
    <Panel title='Measurements'>
      <Wrapper>measurements go here</Wrapper>
    </Panel>
  )
}

const Wrapper = styled.div`
  min-height: 300px;
  max-height: 420px;
`
