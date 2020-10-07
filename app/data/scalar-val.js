import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

export default class ScalarValue extends React.Component {
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
      <ScalarVal>
        <ContentEditable
          text={this.props.item.value}
          onChange={this.onChange}
          onFinish={this.onFinish}
        />
      </ScalarVal>
    )
  }

  renderScalar () {
    var i = this.props.item
    return (
      <ScalarVal onClick={this.onClick}>
        <Evaluated>{i && i.evaluated}</Evaluated>
        <Value>
          {evalStuff.generateValueMarkup(
            (i && i.value) || '',
            i,
            this.props.pictureData,
            this.props.updateItem
          )}
        </Value>
      </ScalarVal>
    )
  }
}

const ScalarVal = styled.div.attrs({ className: 'scalar-val' })`
  min-height: 22px;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`

const Value = styled.div`
  display: none;
  ${ScalarVal}:hover & {
    display: block;
  }
`
const Evaluated = styled.div`
  ${ScalarVal}:hover & {
    display: none;
  }
`
