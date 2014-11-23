var React = require('react');

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
        { label: 'if',   hotkey: 'l' }
      ],
      modifiers: [
        { label: 'guide', hotkey: 'g' },
        { label: 'clip',  hotkey: 'k' }
      ]
    };
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
