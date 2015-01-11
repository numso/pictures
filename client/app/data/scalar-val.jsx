var React = require('react');
var ContentEditable = require('../common/content-editable');
var Dragger = require('./dragger');
var store = require('../stores/pictures');
var _ = require('lodash');

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.picID !== this.props.picID) {
      this.setState({
        editting: false
      });
    }
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
    // store.setCur(store.getCur());
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
    return (
      <div className="scalar-val" onClick={this.onClick}>
        <div className="evaluated">{this.props.item.evaluated}</div>
        <div className="value">
          {generateValueMarkup(this.props.item.value || '', this.props.item)}
        </div>
      </div>
    );
  }

});

module.exports = ScalarVal;

function generateValueMarkup(val, item) {
  var map = getMap();
  var re = /[as]_[0-9]*/;
  var chunks = val.split(/\s/);

  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) {
      return (<div className="tag">{map[chunk]}</div>);
    }
    if (!isNaN(parseFloat(chunk))) {
      var firstChunk = arr.slice(0, i).join(' ');
      var secondChunk = arr.slice(i + 1, arr.length).join(' ');
      return <Dragger number={chunk} firstChunk={firstChunk} secondChunk={secondChunk} item={item}/>
    }
    return (<span> {chunk} </span>);
  });
}

function getMap() {
  var data = store.getData(GETCUR());
  var obj = {};
  _.each(data.arrays, (a) => {
    obj[a.id] = a.label;
  });
  _.each(data.scalars, (s) => {
    obj[s.id] = s.label;
  });
  return obj;
}

var pStore = require('../pictures/store');
function GETCUR() {
  return pStore.state.cursor('selectedPicture').get('current');
}
