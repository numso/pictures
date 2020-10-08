import React from 'react'
import styled from 'styled-components'

export default function ContentEditable ({ onChange, onFinish, text }) {
  const initialText = React.useRef(text)
  const ref = React.useRef()
  React.useEffect(() => {
    setTimeout(() => selectElementContents(ref.current))
  }, [])
  const onKeyDown = e =>
    e.keyCode === 13 && onFinish((ref.current.innerText || '').trim())
  return (
    <EditableArea
      ref={ref}
      onInput={() => onChange && onChange((ref.current.innerText || '').trim())}
      onKeyDown={onFinish && onKeyDown}
      contentEditable
      dangerouslySetInnerHTML={{ __html: initialText.current }}
    />
  )
}

function selectElementContents (el) {
  const range = document.createRange()
  range.selectNodeContents(el)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

const EditableArea = styled.div`
  background: #fff;
  min-width: 50px;
`
