var React = require('react');
var ContentEditable = require('../common/content-editable');

var Tag = React.createClass({

  getInitialState() {
    return {
      editing: false,
      showChildren: false
    };
  },

  onMouseUp() {
    this.setState({
      editing: true
    });
  },

  onChange(lbl) {
    this.updateLabel(lbl);
  },

  onFinish(lbl) {
    this.updateLabel(lbl);
    this.setState({
      editing: false
    });
  },

  updateLabel(newLbl) {
    this.props.item.update('label', () => newLbl);
  },

  toggleShowChildren() {
    this.setState({
      showChildren: !this.state.showChildren
    });
  },

  render() {
    return this.state.editing ? this.renderEditableTag() : this.renderTag();
  },

  renderEditableTag() {
    return (
      <div>
        <div className="tag" style={{ color: 'black' }}>
          <ContentEditable text={this.props.item.get('label')} onChange={this.onChange} onFinish={this.onFinish}/>
        </div>
      </div>
    );
  },

  onDragStart() {
    event.dataTransfer.setData('text/plain', this.props.item.get('id'));
  },

  renderTag() {
    var classes = React.addons.classSet({
      tag: true,
      '--array': this.props.children
    });
    return (
      <div>
        <div draggable="true" onDragStart={this.onDragStart} className={classes} onMouseUp={this.onMouseUp}>
          {this.props.item.get('label')}
        </div>
        {this.props.children && <div className="tag__arrow" onClick={this.toggleShowChildren}/>}
        {this.state.showChildren && this.props.children}
      </div>
    );
  }

});

module.exports = Tag;
