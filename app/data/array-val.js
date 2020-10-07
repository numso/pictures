import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

import ContentEditable from '../common/content-editable'
import * as evalStuff from '../common/eval-stuff'

function getArr (item) {
  if (item && _.isArray(item)) return item
  return []
}

export default class ArrayValue extends React.Component {
  state = { editting: false }

  onClick = () => this.setState({ editting: true })

  onChange = val => this.updateValue(val)

  onFinish = val => {
    this.updateValue(val)
    this.setState({ editting: false })
  }

  updateValue = newValue => this.props.updateItem(newValue)

  render () {
    return this.state.editting ? this.renderEditableArray() : this.renderArray()
  }

  renderEditableArray () {
    return (
      <ArrayVal>
        <ContentEditable
          text={this.props.item.value}
          onChange={this.onChange}
          onFinish={this.onFinish}
        />
      </ArrayVal>
    )
  }

  renderArray () {
    // TODO:: parse out numbers and render draggable numbers in their place in value section
    var i = this.props.item
    return (
      <ArrayVal onClick={this.onClick}>
        <Evaluated>
          {getArr(i && i.evaluated).map(item => (
            <DataIndice>{item}</DataIndice>
          ))}
        </Evaluated>
        <Value>
          {evalStuff.generateValueMarkup(
            (i && i.value) || '',
            i,
            this.props.pictureData,
            this.props.updateItem
          )}
        </Value>
      </ArrayVal>
    )
  }
}

const ArrayVal = styled.div`
  min-height: 22px;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`

const Evaluated = styled.div`
  ${ArrayVal}:hover & {
    display: none;
  }
`

const Value = styled.div`
  display: none;
  ${ArrayVal}:hover & {
    display: block;
  }
  height: 25px;
`

const DataIndice = styled.div`
  display: inline-block;
  font-size: 12px;
  width: 40px;
  height: 22px;
  border-left: 1px solid;
  text-align: center;
  &:last-of-type {
    border-right: 1px solid;
  }
`
