import React from 'react'
import styled from 'styled-components'

export default class ContentEditable extends React.Component {
  ref = React.createRef()

  componentDidMount () {
    setTimeout(() => {
      selectElementContents(this.ref.current)
    })
  }

  shouldComponentUpdate () {
    return false
  }

  onInput = () => {
    var text = (this.ref.current.innerText || '').trim()
    this.props.onChange && this.props.onChange(text)
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      var text = (this.ref.current.innerText || '').trim()
      this.props.onFinish && this.props.onFinish(text)
    }
  }

  render () {
    return (
      <EditableArea
        ref={this.ref}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      />
    )
  }
}

function selectElementContents (el) {
  var range = document.createRange()
  range.selectNodeContents(el)
  var sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

const EditableArea = styled.span`
  background-color: white;
  min-width: 50px;
  display: inline-block;
`
