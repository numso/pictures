var React = require('react');
var ContentEditable = require('./content-editable');

var Tag = React.createClass({

  render() {
    return (
      <div>
        <ContentEditable draggable="true" text={this.props.item.label} className="tag"/>
      </div>
    );
  }

});

module.exports = Tag;
