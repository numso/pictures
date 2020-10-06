import React from 'react'

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
      <span
        ref={this.ref}
        style={{
          backgroundColor: 'white',
          minWidth: 50,
          display: 'inline-block'
        }}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      ></span>
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
