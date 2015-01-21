var React = require('react');
var ContentEditable = require('../common/content-editable');
var _ = require('lodash');
var PictureStore = require('../pictures/store');
var evalStuff = require('../common/eval-stuff');

var ScalarVal = React.createClass({

  getInitialState() {
    return {
      editing: false
    };
  },

  onClick() {
    this.setState({
      editing: true
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.picID !== this.props.picID) {
      this.setState({
        editing: false
      });
    }
  },

  onChange(val) {
    this.updateValue(val);
  },

  onFinish(val) {
    this.updateValue(val);
    this.setState({
      editing: false
    });
  },

  updateValue(newValue) {
    this.props.item.update('value', () => newValue);
    PictureStore.updatePicture(this.props.picID);
  },

  render() {
    return this.state.editing ? this.renderEditableScalar() : this.renderScalar();
  },

  renderEditableScalar() {
    return (
      <div className="scalar-val">
        <ContentEditable text={this.props.item.get('value')} onChange={this.onChange} onFinish={this.onFinish}/>
      </div>
    );
  },

  renderScalar() {
    var i = this.props.item;
    return (
      <div className="scalar-val" onClick={this.onClick}>
        <div className="evaluated">{i && i.get('evaluated')}</div>
        <div className="value">
          {evalStuff.generateValueMarkup((i && i.get('value')) || '', i, this.props.pictureData, this.props.picID)}
        </div>
      </div>
    );
  }

});

module.exports = ScalarVal;