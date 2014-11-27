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

          <div>
            <div className="header">Instructions (this is all WIP)</div>
            <div className="container --data" style={{minHeight: 10}}>
              <div style={{padding: 10 }}>
                <p style={{padding: 5}}>The equations below accept valid Javascript.</p>
                <p style={{padding: 5}}>Arrays and Scalars are in the same context.</p>
                <p style={{padding: 5}}>You must reference other pieces of data by their ID.</p>
                <p style={{padding: 5}}>Format: z_#1_#2</p>
                <p style={{padding: 5, paddingLeft: 40}}>z = a or s (array,scalar)</p>
                <p style={{padding: 5, paddingLeft: 40}}>#1 = image number (always 1)</p>
                <p style={{padding: 5, paddingLeft: 40}}>#2 = variable number (from 1 on)</p>
                <p style={{padding: 5}}>Examples: s_1_3 or a_1_1</p>
                <p style={{padding: 5}}>Can also use: ar_1_1_max, ar_1_1_min, ar_1_1_avg, ar_1_1_len, ar_1_1_sum</p>
              </div>
            </div>
          </div>

          <Data pictureID={0}/>

          <div>
            <div className="header">Steps</div>
            <div className="container --data">steps go here</div>
          </div>

          <div>
            <div className="header">Measurements</div>
            <div className="container --data">measurements go here</div>
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
