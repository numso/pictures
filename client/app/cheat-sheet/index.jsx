var {component} = require('omniscient-tools');

module.exports = component(function ({labels, mode}) {

  function isCurrent(item) {
    return item.get('label') === mode.get('current');
  }

  function setMode(item) {
    return function () {
      mode.update('current', () => item.get('label'));
    };
  }

  return (
    <div className="cheatsheet">
      {labels.map((items, key) => {
        return (
          <div className="cheatsheet__section">
            <div className="cheatsheet__title">{key}</div>
            {items.map((item) => {
              var classes = isCurrent(item) ? 'cheatsheet__group --selected' : 'cheatsheet__group';
              return (
                <div className={classes} onClick={setMode(item)}>
                  <div className="cheatsheet__item">{item.get('label')}</div>
                  <div className="cheatsheet__hotkey">{item.get('hotkey')}</div>
                </div>
              );
            }).toJS()}
          </div>
        );
      }).toJS()}
    </div>
  );

});

// componentDidMount() {
//   document.addEventListener('keydown', (e) => {
//     switch (e.keyCode) {
//       case 88: // x
//         this.setMode('line');
//         break;
//       case 82: // r
//         this.setMode('rect');
//         break;
//       case 67: // c
//         this.setMode('circle');
//         break;
//       case 84: // t
//         this.setMode('text');
//         break;
//       case 65: // a
//       case 85: // u
//       case 80: // p
//       case 86: // v
//       case 83: // s
//       case 69: // e
//       case 68: // d
//       case 76: // l
//       case 73: // i
//       case 71: // g
//       case 75: // k
//         console.log('Key Not Supported... yet', e.keyCode);
//         break;
//       default:
//         console.log('Key Not Supported', e.keyCode);
//         break;
//     }
//   });
// }
