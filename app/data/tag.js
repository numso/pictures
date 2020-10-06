import React from 'react'

import ContentEditable from '../common/content-editable'

export default class Tag extends React.Component {
  state = {
    editing: false,
    showChildren: false
  }

  onMouseUp () {
    this.setState({ editing: true })
  }

  onChange (lbl) {
    this.updateLabel(lbl)
  }

  onFinish (lbl) {
    this.updateLabel(lbl)
    this.setState({ editing: false })
  }

  updateLabel (newLbl) {
    this.props.updateLabel(newLbl)
  }

  toggleShowChildren () {
    this.setState({ showChildren: !this.state.showChildren })
  }

  render () {
    return this.state.editing ? this.renderEditableTag() : this.renderTag()
  }

  renderEditableTag () {
    return (
      <div>
        <div className='tag' style={{ color: 'black' }}>
          <ContentEditable
            text={this.props.item.label}
            onChange={this.onChange}
            onFinish={this.onFinish}
          />
        </div>
      </div>
    )
  }

  onDragStart () {
    event.dataTransfer.setData('text/plain', this.props.item.id)
  }

  renderTag () {
    var classes = this.props.children ? 'tag --array' : 'tag'
    return (
      <div>
        <div
          draggable='true'
          onDragStart={this.onDragStart}
          className={classes}
          onMouseUp={this.onMouseUp}
        >
          {this.props.item.label}
        </div>
        {this.props.children && (
          <div className='tag__arrow' onClick={this.toggleShowChildren} />
        )}
        {this.state.showChildren && this.props.children}
      </div>
    )
  }
}
