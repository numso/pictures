var React = require('react');
var steps = require('../stores/steps');

var Steps = React.createClass({

  getInitialState() {
    return {
      steps: steps.data
    };
  },

  componentDidMount() {
    steps.listen(this.refresh);
  },

  refresh() {
    this.setState({ steps: steps.data });
  },

  renderStep(s, i, steps) {
    var msg = '';
    switch (s.type) {
      case 'circle': msg = `Draw circle around (${s.x1}, ${s.y1}), ${Math.floor(s.r)} px in radius.`; break;
      case 'rect': msg = `Draw rect from (${s.x1}, ${s.y1}), ${s.x2 - s.x1} px horizontally, ${s.y2 - s.y1} px vertically.`; break;
      case 'line': msg = `Draw line from (${s.x1}, ${s.y1}), ${s.x2 - s.x1} px horizontally, ${s.y2 - s.y1} px vertically.`; break;
      case 'text': msg = `Draw text at (${s.x1}, ${s.y1})`; break;
    }

    // TODO:: for 0 to i in steps, draw it on the styled div.

    var style = {
      backgroundColor: 'white',
      height: 100,
      width: 150,
      display: 'inline-block',
      boxShadow: '0 0 20px 2px rgba(0,0,0,0.5)'
    };

    return (
      <li style={{padding: '10px 0'}}>
        <div style={style}></div>
        <p style={{float: 'right', width: 240}}>{msg}</p>
      </li>
    );
  },

  render() {
    return (
      <div>
        <div className="header">Steps</div>
        <div className="container --data">
          <ul>{this.state.steps.map(this.renderStep)}</ul>
        </div>
      </div>
    );
  }

});

module.exports = Steps;
