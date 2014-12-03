var React = require('react');
var Picture = require('./picture');

var store = require('../stores/pictures');

var Pictures = React.createClass({

  addNew() {
    store.addItem();
    this.setState({
      numPictures: store.getLength(),
      curPicture: store.getLength() - 1
    });
  },

  getInitialState() {
    return {
      numPictures: store.getLength(),
      curPicture: store.getCur()
    };
  },

  setPicture(i) {
    store.setCur(i);
    this.setState({
      curPicture: i
    });
  },

  renderPictures() {
    var markup = [];
    for (var i = 0; i < this.state.numPictures; i++) {
      var title = store.getData(i).title;
      markup.push(<Picture num={i} title={title} selected={this.state.curPicture === i} onClick={this.setPicture.bind(this, i)}/>);
    }
    return markup;
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
      </div>
    );
  }

});

module.exports = Pictures;
