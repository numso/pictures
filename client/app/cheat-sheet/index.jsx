var React = require('react');
var store = require('../stores/mode');

var CheatSheet = React.createClass({

  getInitialState() {
    return {
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
    };
  },

  componentDidMount() {
    document.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 88:
          console.log('Switch Mode to Line');
          store.mode = 'line';
          break;
        case 82:
          console.log('Switch Mode to Rect');
          store.mode = 'square';
          break;
        case 67:
          console.log('Switch Mode to Circle');
          store.mode = 'circle';
          break;
        default:
          console.log('Key Not supported yet');
          break;
      }
    });
  },

  render() {

    var test = [];
    for (var key in this.state) {
      test.push(
        <div className="cheatsheet__section">
          <div className="cheatsheet__title">{key}</div>
          {this.state[key].map(function (item) {
            return (
              <div className="cheatsheet__group">
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
        {test}
      </div>
    );
  }

});

module.exports = CheatSheet;
