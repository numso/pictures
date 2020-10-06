import React from 'react'

import PictureStore from '../pictures/store'

var originalNum, originalX, step, curNum

var Dragger = React.createClass({
  getDefaultProps () {
    return {
      number: 0,
      firstChunk: '',
      secondChunk: ''
    }
  },

  componentWillReceiveProps (nextProps) {
    if (!this.state.isDragging) {
      this.setState({
        number: nextProps.number
      })
    }
  },

  getInitialState () {
    return {
      number: 0,
      isDragging: false
    }
  },

  componentDidMount () {
    this.setState({
      number: this.props.number
    })
  },

  onDragStart (e) {
    this.setState({
      isDragging: true
    })
    originalNum = parseFloat(this.state.number)
    originalX = e.clientX
    step = 10
    // e.dataTransfer.setDragImage(document.getElementById('blank'), 0, 0);
  },

  onDrag (e) {
    if (e.clientX === 0) return
    var delta = e.clientX - originalX
    var num = Math.floor(originalNum + (delta / 20) * step)
    if (num !== curNum) {
      curNum = num
      this.setNum(curNum)
    }
  },

  setNum (num) {
    var hasComma = this.props.number[this.props.number.length - 1] === ','
    if (hasComma) num += ','
    var newVal = [this.props.firstChunk, num, this.props.secondChunk]
      .join(' ')
      .trim()

    this.props.item.update('value', () => newVal)
    PictureStore.updatePicture(this.props.picID)

    this.setState({
      number: num
    })
  },

  onDragEnd (e) {
    this.setState({
      isDragging: false
    })
  },

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
})

export default Dragger
