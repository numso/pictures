var React = require('react');
var ContentEditable = require('./content-editable');

var CreateTag = React.createClass({

  getDefaultProps() {
    return {
      onClick: function () {}
    };
  },

  render() {
    return (
      <div>
        <span onClick={this.props.onClick} className="tag --create">{this.props.children}</span>
      </div>
    );
  }

});

module.exports = CreateTag;
