var React = window.React = require('react');
var Data = require('./data');
require('./style');

var App = React.createClass({

  render() {
    return (
      <div>
        <header>Data Visualizations</header>
        <div id="pictures">Pictures</div>
        <div>
          <Data/>
        </div>
        Picture
        Cheet Sheet
      </div>
    );
  }

});

React.render(<App/>, document.body);
