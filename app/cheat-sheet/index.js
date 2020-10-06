import { keyBy, groupBy } from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components'

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

const hotKeyMap = keyBy(menu, 'hotkey')
const categories = groupBy(menu, 'category')

export default function CheatSheet ({ mode, setMode }) {
  React.useEffect(() => {
    const hotkeys = e => {
      // TODO;; check that this works as expected
      const item = hotKeyMap[e.key]
      if (item) setMode(item.label)
    }
    document.addEventListener('keydown', hotkeys)
    return () => document.removeEventListener(hotkeys)
  }, [])
  return (
    <div>
      {categories.map((items, key) => (
        <Section>
          <Title>{key}</Title>
          {items.map(item => (
            <Group selected={item.label === mode} onClick={setMode(item.label)}>
              <Item selected={item.label === mode}>{item.label}</Item>
              <Hotkey>{item.hotkey}</Hotkey>
            </Group>
          ))}
        </Section>
      ))}
    </div>
  )
}

const Section = styled.div`
  margin-bottom: 20px;
`

const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  text-decoration: underline;
  padding-right: 40px;
  text-align: right;
`

const Group = styled.div`
  text-align: right;
  padding-right: 20px;
  cursor: pointer;
  ${p =>
    p.selected &&
    css`
      background-color: #ccc;
    `}
`

const Item = styled.div`
  display: inline-block;
  color: ${p => (p.selected ? 'white' : '#ccc')};
`

const Hotkey = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-weight: bold;
`
