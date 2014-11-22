var React = window.React = require('react');
var Data = require('./data');

var App = React.createClass({

  render() {
    return (
      <div>
        <div className="header">Data Visualizations</div>
        <div className="container --pictures">
          <Picture/>
          <Picture/>
          <Picture/>
          <span>(+)</span>
        </div>
        <div style={{ width: 400 }}>
          <Data/>
        </div>
        Picturee
        Cheet Sheet
      </div>
    );
  }

});




var Picture = React.createClass({

  render() {
    return (
      <div className="picture">
      </div>
    );
  }

});



React.render(<App/>, document.body);
