var React = require('react');
var ContentEditable = require('../common/content-editable');
var store = require('../stores/pictures');

var ScalarVal = React.createClass({

  getInitialState() {
    return {
      editting: false
    };
  },

  onClick() {
    this.setState({
      editting: true
    });
  },

  onChange(val) {
    this.updateValue(val);
  },

  onFinish(val) {
    this.updateValue(val);
    this.setState({
      editting: false
    });
  },

  updateValue(newValue) {
    this.props.item.value = newValue;
    store.setCur(store.getCur());
  },

  render() {
    return this.state.editting ? this.renderEditableScalar() : this.renderScalar();
  },

  renderEditableScalar() {
    return (
      <div className="scalar-val">
        <ContentEditable text={this.props.item.value} onChange={this.onChange} onFinish={this.onFinish}/>
      </div>
    );
  },

  renderScalar() {
    // TODO:: parse out numbers and render draggable numbers in their place in value section
    return (
      <div className="scalar-val" onClick={this.onClick}>
        <div className="evaluated">{this.props.item.evaluated}</div>
        <div className="value">{this.props.item.value}</div>
      </div>
    );
  }

});

module.exports = ScalarVal;
