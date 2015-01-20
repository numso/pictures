var React = require('react');
var ContentEditable = require('../common/content-editable');
var PictureStore = require('../pictures/store');
var evalStuff = require('../common/eval-stuff');

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
    this.props.item.update('value', () => newValue);
    PictureStore.updatePicture(this.props.picID);
  },

  render() {
    return this.state.editting ? this.renderEditableArray() : this.renderArray();
  },

  renderEditableArray() {
    return (
      <div className="array-val">
        <ContentEditable text={this.props.item.get('value')} onChange={this.onChange} onFinish={this.onFinish}/>
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
          {evalStuff.generateValueMarkup(i && i.get('value') || '', i, this.props.pictureData, this.props.picID)}
        </div>
      </div>
    );
  }

});

module.exports = ArrayVal;
