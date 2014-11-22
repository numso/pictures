/**
 * @jsx React.DOM
 */

var React = window.React = require('react');

var App = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="small-12 column">
          <h1>Hello Visualizations</h1>
        </div>
      </div>
    );
  }

});

React.renderComponent(<App/>, document.body);
