import immstruct from 'immstruct'

export var state = immstruct({
  labels: {
    draw: [
      { label: 'line', hotkey: 'x' },
      // { label: 'path',    hotkey: 'a' },
      { label: 'rect', hotkey: 'r' },
      { label: 'circle', hotkey: 'c' },
      { label: 'text', hotkey: 't' }
      // { label: 'magnet',  hotkey: 'u' },
      // { label: 'picture', hotkey: 'p' }
    ]
    // adjust: [
    //   { label: 'move',      hotkey: 'v' },
    //   { label: 'scale',     hotkey: 's' },
    //   { label: 'rotate',    hotkey: 'e' },
    //   { label: 'duplicate', hotkey: 'd' }
    // ],
    // flow: [
    //   { label: 'loop', hotkey: 'l' },
    //   { label: 'if',   hotkey: 'i' }
    // ],
    // modifiers: [
    //   { label: 'guide', hotkey: 'g' },
    //   { label: 'clip',  hotkey: 'k' }
    // ]
  },

  mode: {
    current: 'line'
  }
})

function codeFromLetter (str) {
  return str.toUpperCase().charCodeAt(0)
}

export const getItemFor = code => {
  return state.current.get('labels').reduce((memo, set) => {
    return (
      memo ||
      set.find(item => {
        return codeFromLetter(item.get('hotkey')) === code
      })
    )
  }, undefined)
}
