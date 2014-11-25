var React = window.React = require('react');
var Data = require('./data');
var CheatSheet = require('./cheat-sheet');

var App = React.createClass({

  render() {
    return (
      <div>
        <div className="header">Pictures</div>
        <div className="container --pictures">
          <Picture/>
          <Picture/>
          <Picture/>
          <div className="newpicture">
            <span className="newpicture__content">+</span>
          </div>
        </div>

        <div style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}>
          <Data/>

          <div>
            <div className="header">Steps</div>
            <div className="container --data">steps here</div>
          </div>

          <div>
            <div className="header">Measurements</div>
            <div className="container --data">measurements here</div>
          </div>
        </div>

        <div style={{ display: 'inline-block', paddingTop: 20 }}>
          <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
            <BigPicture/>
          </div>

          <div style={{ display: 'inline-block', position: 'absolute', right: 0 }}>
            <CheatSheet/>
          </div>
        </div>
      </div>
    );
  }

});




var Picture = React.createClass({

  render() {
    return (
      <div className="picture"/>
    );
  }

});



var BigPicture = React.createClass({

  render() {
    return (
      <div className="picture --big"/>
    );
  }

});



React.render(<App/>, document.body);
