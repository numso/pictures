var React = require('react');
var steps = require('../stores/steps');

var Steps = React.createClass({

  getInitialState() {
    return {
      steps: steps.data,
      selected: null
    };
  },

  componentDidMount() {
    steps.listen(this.refresh);
  },

  refresh() {
    this.setState({
      steps: steps.data,
      selected: steps.data.length - 1
    });
  },

  renderStep(s, i, steps) {
    var msg = '';
    switch (s.type) {
      case 'circle': msg = `Draw circle around (${s.x1}, ${s.y1}), ${Math.floor(s.r)} px in radius.`; break;
      case 'rect': msg = `Draw rect from (${s.x1}, ${s.y1}), ${s.x2 - s.x1} px horizontally, ${s.y2 - s.y1} px vertically.`; break;
      case 'line': msg = `Draw line from (${s.x1}, ${s.y1}), ${s.x2 - s.x1} px horizontally, ${s.y2 - s.y1} px vertically.`; break;
      case 'text': msg = `Draw text at (${s.x1}, ${s.y1})`; break;
    }

    var PROPORTION = (1/9);
    var svgParts = [];
    for (var j = 0; j <= i; j++) {
      var s = steps[j];
      switch (s.type) {
        case 'circle': svgParts.push(<circle cx={s.x1*PROPORTION} cy={s.y1*PROPORTION} r={s.r*PROPORTION} fill="#cacaca"/>); break;
        case 'rect':
          var x = Math.min(s.x1, s.x2);
          var y = Math.min(s.y1, s.y2);
          var w = Math.abs(s.x1 - s.x2);
          var h = Math.abs(s.y1 - s.y2);
          svgParts.push(<rect x={x*PROPORTION} y={y*PROPORTION} width={w*PROPORTION} height={h*PROPORTION} fill="#cacaca"/>);
          break;
        case 'line': svgParts.push(<line x1={s.x1*PROPORTION} y1={s.y1*PROPORTION} x2={s.x2*PROPORTION} y2={s.y2*PROPORTION} stroke="#cacaca"/>); break;
        case 'text': svgParts.push(<text x={s.x1*PROPORTION} y={s.y1*PROPORTION} fill="#cacaca" fontSize="4">Hi!</text>); break;
      }
    }

    var style = {
      backgroundColor: 'white',
      height: 100,
      width: 150,
      display: 'inline-block',
      boxShadow: '0 0 20px 2px rgba(0,0,0,0.5)'
    };

    var item = {
      padding: '10px 0',
      cursor: 'pointer'
    };

    if (this.state.selected === i) {
      item.backgroundColor = '#a0af0b';
    }

    return (
      <li style={item} onClick={this.onClick.bind(this, i)}>
        <svg style={style}>
          {svgParts}
        </svg>
        <p style={{float: 'right', width: 240}}>{msg}</p>
      </li>
    );
  },

  onClick(selected) {
    this.setState({ selected });
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
