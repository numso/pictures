var React = require('react/addons');
var store = require('../stores/mode');

var CheatSheet = React.createClass({

  getInitialState() {
    return {
      labels: {
        draw: [
          { label: 'line',    hotkey: 'x' },
          { label: 'path',    hotkey: 'a' },
          { label: 'rect',    hotkey: 'r' },
          { label: 'circle',  hotkey: 'c' },
          { label: 'text',    hotkey: 't' },
          { label: 'magnet',  hotkey: 'u' },
          { label: 'picture', hotkey: 'p' }
        ],
        adjust: [
          { label: 'move',      hotkey: 'v' },
          { label: 'scale',     hotkey: 's' },
          { label: 'rotate',    hotkey: 'e' },
          { label: 'duplicate', hotkey: 'd' }
        ],
        flow: [
          { label: 'loop', hotkey: 'l' },
          { label: 'if',   hotkey: 'i' }
        ],
        modifiers: [
          { label: 'guide', hotkey: 'g' },
          { label: 'clip',  hotkey: 'k' }
        ]
      },
      mode: 'line'
    };
  },

  setMode(mode) {
    store.mode = mode;
    this.setState({ mode });
  },

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 88: // x
          this.setMode('line');
          break;
        case 82: // r
          this.setMode('rect');
          break;
        case 67: // c
          this.setMode('circle');
          break;
        case 65: // a
        case 84: // t
        case 85: // u
        case 80: // p
        case 86: // v
        case 83: // s
        case 69: // e
        case 68: // d
        case 76: // l
        case 73: // i
        case 71: // g
        case 75: // k
          console.log('Key Not Supported... yet', e.keyCode);
          break;
        default:
          console.log('Key Not Supported', e.keyCode);
          break;
      }
    });
  },

  render() {
    var content = [];
    for (var key in this.state.labels) {
      content.push(
        <div className="cheatsheet__section">
          <div className="cheatsheet__title">{key}</div>
          {this.state.labels[key].map((item) => {
            var classes = React.addons.classSet({
              cheatsheet__group: true,
              '--selected': item.label === this.state.mode
            });
            return (
              <div className={classes} onClick={this.setMode.bind(this, item.label)}>
                <div className="cheatsheet__item">{item.label}</div>
                <div className="cheatsheet__hotkey">{item.hotkey}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="cheatsheet">
        {content}
      </div>
    );
  }

});

module.exports = CheatSheet;
