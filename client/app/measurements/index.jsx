var React = require('react');

var Measurements = React.createClass({

  render() {
    return (
      <div>
        <div className="header">Measurements</div>
        <div className="container --data">measurements go here</div>
      </div>
    );
  }

});

module.exports = Measurements;
