var React = require('react');
var ContentEditable = require('../common/content-editable');
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
    return (
      <div className="scalar-val" onClick={this.onClick}>
        <div className="evaluated">{this.props.item.evaluated}</div>
        <div className="value">
          {generateValueMarkup(this.props.item.value || '')}
        </div>
      </div>
    );
  }

});

module.exports = ScalarVal;

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
