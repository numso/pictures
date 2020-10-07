import React from 'react'
import styled from 'styled-components'

import { Header, Container } from '../common/container'

export default function Measurements () {
  return (
    <div>
      <Header>Measurements</Header>
      <MyContainer>measurements go here</MyContainer>
    </div>
  )
}

const MyContainer = styled(Container)`
  min-height: 300px;
  max-height: 420px;
  overflow: auto;
`
