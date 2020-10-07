import _ from 'lodash'
import React from 'react'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

export default class ScalarVal extends React.Component {
  state = { editing: false }

  onClick = () => this.setState({ editing: true })

  onChange = val => this.updateValue(val)

  onFinish = val => {
    this.updateValue(val)
    this.setState({ editing: false })
  }

  updateValue = newValue => this.props.updateItem(newValue)

  render () {
    return this.state.editing
      ? this.renderEditableScalar()
      : this.renderScalar()
  }

  renderEditableScalar () {
    return (
      <div className='scalar-val'>
        <ContentEditable
          text={this.props.item.value}
          onChange={this.onChange}
          onFinish={this.onFinish}
        />
      </div>
    )
  }

  renderScalar () {
    var i = this.props.item
    return (
      <div className='scalar-val' onClick={this.onClick}>
        <div className='evaluated'>{i && i.evaluated}</div>
        <div className='value'>
          {evalStuff.generateValueMarkup(
            (i && i.value) || '',
            i,
            this.props.pictureData,
            this.props.updateItem
          )}
        </div>
      </div>
    )
  }
}
