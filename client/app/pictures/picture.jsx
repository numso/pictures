var React = require('react/addons');

var Picture = React.createClass({

  render() {
    var classes = React.addons.classSet({
      picture: true,
      '--selected': this.props.selected
    });
    return (
      <div>
        <div className={classes} onClick={this.props.onClick}/>
        <div style={{ textAlign: 'center', marginBottom: 15 }}>{this.props.title}</div>
      </div>
    );
  }

});

module.exports = Picture;
