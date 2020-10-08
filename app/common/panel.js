import React from 'react'
import styled from 'styled-components'

export function Panel ({ title, children, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Header>{title}</Header>
      <Contents>{children}</Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Header = styled.div`
  background: #b9c8e7;
  background: linear-gradient(to bottom, #b9c8e7 0%, #98a6c1 100%);
  text-align: center;
  padding: 4px 0;
`

const Contents = styled.div`
  background-color: #e4e8ef;
  overflow: auto;
  height: calc(100% - 26px);
`
