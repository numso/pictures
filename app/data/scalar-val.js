import _ from 'lodash'
import React from 'react'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

// TODO;; make sure this gets keyed correctly
export default class ScalarVal extends React.Component {
  state = { editing: false }

  onClick = () => this.setState({ editing: true })

  onChange = val => this.updateValue(val)

  onFinish = val => {
    this.updateValue(val)
    this.setState({ editing: false })
  }

  updateValue = newValue => {
    this.props.item.update('value', () => newValue)
    // TODO;; resolve this item
  }

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
            this.props.pictureData
          )}
        </div>
      </div>
    )
  }
}
