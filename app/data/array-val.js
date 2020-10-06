import _ from 'lodash'
import React from 'react'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

function getArr (item) {
  if (item && _.isArray(item)) return item
  return []
}

// TODO;; make sure this gets keyed correctly
export default class ArrayVal extends React.Component {
  state = { editting: false }

  onClick = () => this.setState({ editting: true })

  onChange = val => this.updateValue(val)

  onFinish = val => {
    this.updateValue(val)
    this.setState({ editting: false })
  }

  updateValue = newValue => {
    this.props.item.update('value', () => newValue)
    // TODO;; resolve this
  }

  render () {
    return this.state.editting ? this.renderEditableArray() : this.renderArray()
  }

  renderEditableArray () {
    return (
      <div className='array-val'>
        <ContentEditable
          text={this.props.item.value}
          onChange={this.onChange}
          onFinish={this.onFinish}
        />
      </div>
    )
  }

  renderArray () {
    // TODO:: parse out numbers and render draggable numbers in their place in value section
    var i = this.props.item
    return (
      <div className='array-val' onClick={this.onClick}>
        <div className='evaluated'>
          {getArr(i && i.evaluated).map(item => {
            return <div className='data__indice'>{item}</div>
          })}
        </div>
        <div className='value' style={{ height: 25 }}>
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
