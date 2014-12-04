var React = require('react/addons');
var ContentEditable = require('../common/content-editable');

var store = require('../stores/pictures');

var Picture = React.createClass({

  getInitialState() {
    return {
      editting: false,
      title: store.getData(this.props.num).title
    };
  },

  onMouseUp() {
    this.setState({
      editting: true
    });
  },

  onChange(title) {
    this.updateTitle(title);
  },

  onFinish(title) {
    this.updateTitle(title);
    this.setState({
      editting: false
    });
  },

  updateTitle(newTitle) {
    var datum = store.getData(this.props.num);
    datum.title = newTitle;
    store.setData(datum);
    this.setState({
      title: newTitle
    });
  },

  render() {
    var classes = React.addons.classSet({
      picture: true,
      '--selected': this.props.selected
    });
    var title = this.state.editting ?
      <ContentEditable text={this.state.title} onChange={this.onChange} onFinish={this.onFinish}/> :
      <div onMouseUp={this.onMouseUp}>{this.state.title}</div>;
    return (
      <div>
        <div className={classes} onClick={this.props.onClick}/>
        <div style={{ textAlign: 'center', marginBottom: 15 }}>
        {title}
        </div>
      </div>
    );
  }

});

module.exports = Picture;
