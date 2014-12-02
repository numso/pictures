var React = require('react');
var ContentEditable = require('./content-editable');

var ScalarVal = React.createClass({

  render() {
    return (
      <div style={{minHeight: 22}}><ContentEditable text={this.props.item.evaluated}/></div>
    );
  }

});

module.exports = ScalarVal;
