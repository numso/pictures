import React from 'react'

var originalNum, originalX, step, curNum

export default class Dragger extends React.Component {
  state = { number: 0, isDragging: false }

  componentWillReceiveProps (nextProps) {
    if (!this.state.isDragging) {
      this.setState({ number: nextProps.number })
    }
  }

  componentDidMount () {
    this.setState({ number: this.props.number })
  }

  onDragStart = e => {
    this.setState({ isDragging: true })
    originalNum = parseFloat(this.state.number)
    originalX = e.clientX
    step = 10
    // e.dataTransfer.setDragImage(document.getElementById('blank'), 0, 0);
  }

  onDrag = e => {
    if (e.clientX === 0) return
    var delta = e.clientX - originalX
    var num = Math.floor(originalNum + (delta / 20) * step)
    if (num !== curNum) {
      curNum = num
      this.setNum(curNum)
    }
  }

  setNum = num => {
    var hasComma = this.props.number[this.props.number.length - 1] === ','
    if (hasComma) num += ','
    var newVal = [this.props.firstChunk, num, this.props.secondChunk]
      .join(' ')
      .trim()

    this.props.updateItem(newVal)

    this.setState({ number: num })
  }

  onDragEnd = e => this.setState({ isDragging: false })

  render () {
    return (
      <span
        draggable='true'
        onDrag={this.onDrag}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        {this.state.number}
      </span>
    )
  }
}
