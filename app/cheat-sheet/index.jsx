var {component} = require('omniscient-tools');
require('./hotkeys');

module.exports = component('CheatSheet', function ({labels, mode}) {

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
