import React from 'react'

import ContentEditable from '../common/content-editable'
import * as T from '../common/tag'

export default class Tag extends React.Component {
  state = {
    editing: false,
    showChildren: false
  }

  onMouseUp = () => this.setState({ editing: true })

  onChange = lbl => this.updateLabel(lbl)

  onFinish = lbl => {
    this.updateLabel(lbl)
    this.setState({ editing: false })
  }

  updateLabel = newLbl => this.props.updateLabel(newLbl)

  toggleShowChildren = () =>
    this.setState({ showChildren: !this.state.showChildren })

  render () {
    return this.state.editing ? this.renderEditableTag() : this.renderTag()
  }

  renderEditableTag () {
    return (
      <div>
        <T.Basic style={{ color: 'black' }}>
          <ContentEditable
            text={this.props.item.label}
            onChange={this.onChange}
            onFinish={this.onFinish}
          />
        </T.Basic>
      </div>
    )
  }

  onDragStart = () =>
    event.dataTransfer.setData('text/plain', this.props.item.id)

  renderTag () {
    const TagComponent = this.props.children ? T.Array : T.Basic
    return (
      <div>
        <TagComponent
          draggable='true'
          onDragStart={this.onDragStart}
          onMouseUp={this.onMouseUp}
        >
          {this.props.item.label}
        </TagComponent>
        {this.props.children && <T.Arrow onClick={this.toggleShowChildren} />}
        {this.state.showChildren && this.props.children}
      </div>
    )
  }
}
