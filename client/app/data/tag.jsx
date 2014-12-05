var React = require('react');
var ContentEditable = require('../common/content-editable');
var store = require('../stores/pictures');

var Tag = React.createClass({

  getInitialState() {
    return {
      editting: false
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

  render() {
    if (this.state.editting) {
      return (
        <div>
          <div className="tag" style={{ color: 'black' }}>
            <ContentEditable text={this.props.item.label} onChange={this.onChange} onFinish={this.onFinish}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div draggable="true" className="tag" onMouseUp={this.onMouseUp}>
            {this.props.item.label}
          </div>
        </div>
      );
    }
  }

});

module.exports = Tag;
