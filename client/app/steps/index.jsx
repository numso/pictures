var {component} = require('omniscient-tools');
var {generateParts} = require('../common/drawing');

module.exports = component(function ({steps, selected}) {

  function renderStep(s, i, steps) {
    var msg = '';
    switch (s.get('type')) {
      case 'circle': msg = `Draw circle around (${s.get('x1')}, ${s.get('y1')}), ${Math.floor(s.get('r'))} px in radius.`; break;
      case 'rect': msg = `Draw rect from (${s.get('x1')}, ${s.get('y1')}), ${s.get('x2') - s.get('x1')} px horizontally, ${s.get('y2') - s.get('y1')} px vertically.`; break;
      case 'line': msg = `Draw line from (${s.get('x1')}, ${s.get('y1')}), ${s.get('x2') - s.get('x1')} px horizontally, ${s.get('y2') - s.get('y1')} px vertically.`; break;
      case 'text': msg = `Draw text at (${s.get('x1')}, ${s.get('y1')})`; break;
    }

    var svgParts = generateParts(steps.slice(0, i + 1), 1 / 9, 4);

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

    if (selected.get('current') === i) {
      item.backgroundColor = '#a0af0b';
    }

    return (
      <li style={item} onClick={onClick(i)}>
        <svg style={style}>
          {svgParts}
        </svg>
        <p style={{float: 'right', width: 240}}>{msg}</p>
      </li>
    );
  }

  function onClick(_selected) {
    return function () {
      selected.update('current', () => _selected);
    };
  }

  return (
    <div>
      <div className="header">Steps</div>
      <div className="container --data">
        <ul>{steps.map(renderStep).toJS()}</ul>
      </div>
    </div>
  );

});
