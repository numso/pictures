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
    // store.setCur(store.getCur());
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
    var i = this.props.item;
    return (
      <div className="array-val" onClick={this.onClick}>
        <div className="evaluated">
          {getArr(i && i.get('evaluated')).map((item) => {
            return <div className="data__indice">{item}</div>
          })}
        </div>
        <div className="value" style={{height:25}}>
          {generateValueMarkup(i && i.get('value') || '', i, this.props.pictureData)}
        </div>
      </div>
    );
  }

});

module.exports = ArrayVal;

function generateValueMarkup(val, item, pictureData) {
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
      return <Dragger number={chunk} firstChunk={firstChunk} secondChunk={secondChunk} item={item}/>
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



var pStore = require('../pictures/store');
function GETCUR() {
  return pStore.state.cursor('selectedPicture').get('current');
}
