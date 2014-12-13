var React = require('react');
var ContentEditable = require('../common/content-editable');
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
        <div className="value">
          {generateValueMarkup(this.props.item.value)}
        </div>
      </div>
    );
  }

});

module.exports = ArrayVal;

function generateValueMarkup(val) {
  var map = getMap();
  var re = /[as]_[0-9]*/g;

  var a = val.split(re) || [];
  a = a.map((i) => (<span>{i}</span>));

  var b = val.match(re) || [];
  b = b.map((i) => (<div className="tag">{map[i]}</div>));

  var c = _.compact(_.flatten(_.zip(a, b)));
  return c;
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
