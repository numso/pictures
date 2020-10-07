import styled from 'styled-components'

export const Basic = styled.div`
  background-color: #abbbd9;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  padding: 2px 10px;
  margin: 2px 0;
  font-size: 12px;
  letter-spacing: 2px;
  display: inline-block;
  min-width: 20px;
  min-height: 12px;
  white-space: nowrap;
  &:hover {
    background-color: #8abcd9;
  }
`

export const Create = styled(Basic)`
  background-color: #d8dde3;
  color: #9fa1a8;
  text-align: center;
  opacity: 0;
  &:hover {
    background-color: #d8dde3;
    opacity: 1;
  }
  &:active {
    background-color: #d0d5db;
  }
`

export const Array = styled(Basic)`
  margin-right: 8px;
`

export const Arrow = styled.div`
  display: inline-block;
  border: 4px solid transparent;
  width: 0;
  height: 0;
  border-top: 4px solid white;
  position: relative;
  left: -21px;
  top: 2px;
  cursor: pointer;
`
