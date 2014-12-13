var React = require('react');
var ContentEditable = require('../common/content-editable');
var store = require('../stores/pictures');

var Tag = React.createClass({

  getInitialState() {
    return {
      editting: false,
      showChildren: false
    };
  },

  onMouseUp() {
    this.setState({
      editting: true
    });
  },

  onChange(lbl) {
    this.updateLabel(lbl);
  },

  onFinish(lbl) {
    this.updateLabel(lbl);
    this.setState({
      editting: false
    });
  },

  updateLabel(newLbl) {
    this.props.item.label = newLbl;
    store.setCur(store.getCur());
  },

  toggleShowChildren() {
    this.setState({
      showChildren: !this.state.showChildren
    });
  },

  render() {
    return this.state.editting ? this.renderEditableTag() : this.renderTag();
  },

  renderEditableTag() {
    return (
      <div>
        <div className="tag" style={{ color: 'black' }}>
          <ContentEditable text={this.props.item.label} onChange={this.onChange} onFinish={this.onFinish}/>
        </div>
      </div>
    );
  },

  renderTag() {
    var classes = React.addons.classSet({
      tag: true,
      '--array': this.props.children
    });
    return (
      <div>
        <div draggable="true" className={classes} onMouseUp={this.onMouseUp}>
          {this.props.item.label}
        </div>
        {this.props.children && <div className="tag__arrow" onClick={this.toggleShowChildren}/>}
        {this.state.showChildren && this.props.children}
      </div>
    );
  }

});

module.exports = Tag;
