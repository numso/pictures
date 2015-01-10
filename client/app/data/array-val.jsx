var React = require('react');
var ContentEditable = require('../common/content-editable');
var Dragger = require('./dragger');
var store = require('../stores/pictures');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

var ArrayVal = React.createClass({

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
    store.setCur(store.getCur());
  },

  render() {
    return this.state.editting ? this.renderEditableArray() : this.renderArray();
  },

  renderEditableArray() {
    return (
      <div className="array-val">
        <ContentEditable text={this.props.item.value} onChange={this.onChange} onFinish={this.onFinish}/>
      </div>
    );
  },

  renderArray() {
    // TODO:: parse out numbers and render draggable numbers in their place in value section
    return (
      <div className="array-val" onClick={this.onClick}>
        <div className="evaluated">
          {getArr(this.props.item.evaluated).map((item) => {
            return <div className="data__indice">{item}</div>
          })}
        </div>
        <div className="value" style={{height:25}}>
          {generateValueMarkup(this.props.item.value || '', this.props.item)}
        </div>
      </div>
    );
  }

});

module.exports = ArrayVal;

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
  var data = store.getData(store.getCur());
  var obj = {};
  _.each(data.arrays, (a) => {
    obj[a.id] = a.label;
  });
  _.each(data.scalars, (s) => {
    obj[s.id] = s.label;
  });
  return obj;
}
