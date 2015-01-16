var React = require('react');
var ContentEditable = require('../common/content-editable');
var Dragger = require('./dragger');
var _ = require('lodash');
var PictureStore = require('../pictures/store');

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
          {generateValueMarkup((i && i.get('value')) || '', i, this.props.pictureData, this.props.picID)}
        </div>
      </div>
    );
  }

});

module.exports = ScalarVal;

function generateValueMarkup(val, item, pictureData, picID) {
  var map = getMap(pictureData);
  var re = /[as]_[0-9]*/;
  var chunks = val.split(/\s/);

  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) {
      return (<div className="tag">{map[chunk]}</div>);
    }
    if (!isNaN(parseFloat(chunk))) {
      var firstChunk = arr.slice(0, i).join(' ');
      var secondChunk = arr.slice(i + 1, arr.length).join(' ');
      return <Dragger number={chunk} firstChunk={firstChunk} secondChunk={secondChunk} item={item} picID={picID}/>
    }
    return (<span> {chunk} </span>);
  });
}

function getMap(pictureData) {
  var obj = {};
  for (var i = 0; i < pictureData.get('scalars').size; i++) {
    var item = pictureData.get('scalars').get(i);
    obj[item.get('id')] = item.get('label');
  }
  for (var i = 0; i < pictureData.get('arrays').size; i++) {
    var item = pictureData.get('arrays').get(i);
    obj[item.get('id')] = item.get('label');
  }
  return obj;
}
