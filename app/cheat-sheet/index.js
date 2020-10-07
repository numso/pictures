import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

const menu = [
  { category: 'draw', label: 'line', hotkey: 'x' },
  // { category: 'draw', label: 'path',    hotkey: 'a' },
  { category: 'draw', label: 'rect', hotkey: 'r' },
  { category: 'draw', label: 'circle', hotkey: 'c' },
  { category: 'draw', label: 'text', hotkey: 't' }
  // { category: 'draw', label: 'magnet',  hotkey: 'u' },
  // { category: 'draw', label: 'picture', hotkey: 'p' },
  // { category: 'adjust', label: 'move',      hotkey: 'v' },
  // { category: 'adjust', label: 'scale',     hotkey: 's' },
  // { category: 'adjust', label: 'rotate',    hotkey: 'e' },
  // { category: 'adjust', label: 'duplicate', hotkey: 'd' },
  // { category: 'flow', label: 'loop', hotkey: 'l' },
  // { category: 'flow', label: 'if',   hotkey: 'i' },
  // { category: 'modifiers', label: 'guide', hotkey: 'g' },
  // { category: 'modifiers', label: 'clip',  hotkey: 'k' }
]

const hotKeyMap = _.keyBy(menu, 'hotkey')
const categories = _.groupBy(menu, 'category')

export default function CheatSheet ({ mode, setMode }) {
  React.useEffect(() => {
    const hotkeys = e => {
      const item = hotKeyMap[e.key]
      if (item) setMode(item.label)
    }
    document.addEventListener('keydown', hotkeys)
    return () => document.removeEventListener('keydown', hotkeys)
  }, [])
  return (
    <Wrapper>
      {_.map(categories, (items, title) => (
        <Section>
          <Title>{title}</Title>
          {items.map(item => (
            <Item
              selected={item.label === mode}
              onClick={() => setMode(item.label)}
            >
              <div>{item.label}</div>
              <Hotkey>{item.hotkey}</Hotkey>
            </Item>
          ))}
        </Section>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 0;
`

const Section = styled.div`
  margin-bottom: 16px;
`

const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  text-decoration: underline;
`

const Item = styled.button`
  border: none;
  font-size: 16px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 4px 8px;
  cursor: pointer;
  background: ${p => (p.selected ? '#ccc' : '#fff')};
  color: ${p => (p.selected ? 'white' : '#ccc')};
  &:hover {
    background: ${p => (p.selected ? '#ccc' : '#eee')};
  }
`

const Hotkey = styled.div`
  font-weight: bold;
  color: black;
`
