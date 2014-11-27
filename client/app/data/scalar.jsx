var React = require('react');

var ContentEditable = require('./content-editable');

var Scalar = React.createClass({

  getInitialState() {
    return {
      isHovered: false,
      isActive: false
    };
  },

  getDefaultProps() {
    return {
      item: { label: '' }
    };
  },

  onMouseEnter() {
    this.setState({ isHovered: true });
  },

  onMouseLeave() {
    this.setState({ isHovered: false });
  },

  onFocus() {
    this.setState({ isActive: true });
  },

  onBlur() {
    this.setState({ isActive: false });
  },

  onTitleChange(e) {
    this.props.onTitleChange(e);
  },

  onValueChange(e) {
    this.props.onValueChange(e);
  },

  dragStart() {
    event.dataTransfer.setData('text/plain', this.props.item.id);
  },

  render() {
    var showVal = this.state.isHovered || this.state.isActive;
    var classes = "scalar" + (this.state.isActive ? ' active': '');
    return (
      <tr className={classes} onMouseEnter={this.onMouseEnter} onDragEnter={this.onFocus} onMouseLeave={this.onMouseLeave} onMouseUp={this.onFocus} onBlur={this.onBlur}>
        <td><ContentEditable draggable="true" onDragStart={this.dragStart} onChange={this.onTitleChange} isEditting={this.state.isActive} text={this.props.item.label} className="tag"/></td>
        <td><ContentEditable onChange={this.onValueChange} isEditting={this.state.isActive} text={showVal ? this.props.item.value : this.props.item.evaluated}/></td>
      </tr>
    );
  }

});

module.exports = Scalar;
