var React = window.React = require('react/addons');
var Data = require('./data');
var CheatSheet = require('./cheat-sheet');

var store = require('./pictures-store');

var App = React.createClass({

  getInitialState() {
    return {
      numPictures: store.getLength(),
      curPicture: 0
    };
  },

  renderPictures() {
    var markup = [];
    for (var i = 0; i < this.state.numPictures; i++) {
      markup.push(<Picture num={i} selected={this.state.curPicture === i} onClick={this.setPicture.bind(this, i)}/>);
    }
    return markup;
  },

  setPicture(i) {
    this.setState({
      curPicture: i
    });
  },

  addNew() {
    store.addItem();
    this.setState({
      numPictures: store.getLength(),
      curPicture: store.getLength() - 1
    });
  },

  render() {
    return (
      <div>
        <div className="header">Pictures</div>
        <div className="container --pictures">
          {this.renderPictures()}
          <div className="newpicture" onClick={this.addNew}>
            <span className="newpicture__content">+</span>
          </div>
        </div>

        <div style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}>

          <Data pictureID={this.state.curPicture}/>

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
    var classes = React.addons.classSet({
      picture: true,
      '--selected': this.props.selected
    });
    return (
      <div className={classes} onClick={this.props.onClick}/>
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
