var React = window.React = require('react/addons');

var Pictures = require('./pictures');
var Data = require('./data');
var Steps = require('./steps');
var BigPicture = require('./big-picture');
var Measurements = require('./measurements');

var CheatSheet = require('./cheat-sheet');

var store = require('./pictures-store');

var App = React.createClass({

  getInitialState() {
    return {
      curPicture: store.getCur()
    };
  },

  componentDidMount() {
    store.watch(() => {
      this.setState({
        curPicture: store.getCur()
      });
    });
  },

  render() {
    return (
      <div>
        <Pictures/>

        <div style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}>
          <Data pictureID={this.state.curPicture}/>
          <Steps/>
          <Measurements/>
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

React.render(<App/>, document.body);
