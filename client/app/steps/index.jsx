var {component} = require('omniscient-tools');

module.exports = component(function ({steps, selected}) {

  function renderStep(s, i, steps) {
    var msg = '';
    switch (s.get('type')) {
      case 'circle': msg = `Draw circle around (${s.get('x1')}, ${s.get('y1')}), ${Math.floor(s.get('r'))} px in radius.`; break;
      case 'rect': msg = `Draw rect from (${s.get('x1')}, ${s.get('y1')}), ${s.get('x2') - s.get('x1')} px horizontally, ${s.get('y2') - s.get('y1')} px vertically.`; break;
      case 'line': msg = `Draw line from (${s.get('x1')}, ${s.get('y1')}), ${s.get('x2') - s.get('x1')} px horizontally, ${s.get('y2') - s.get('y1')} px vertically.`; break;
      case 'text': msg = `Draw text at (${s.get('x1')}, ${s.get('y1')})`; break;
    }

    var PROPORTION = (1/9);
    var svgParts = [];
    for (var j = 0; j <= i; j++) {
      var s = steps.get(j);
      switch (s.get('type')) {
        case 'circle': svgParts.push(<circle cx={s.get('x1')*PROPORTION} cy={s.get('y1')*PROPORTION} r={s.get('r')*PROPORTION} fill="#cacaca"/>); break;
        case 'rect':
          var x = Math.min(s.get('x1'), s.get('x2'));
          var y = Math.min(s.get('y1'), s.get('y2'));
          var w = Math.abs(s.get('x1') - s.get('x2'));
          var h = Math.abs(s.get('y1') - s.get('y2'));
          svgParts.push(<rect x={x*PROPORTION} y={y*PROPORTION} width={w*PROPORTION} height={h*PROPORTION} fill="#cacaca"/>);
          break;
        case 'line': svgParts.push(<line x1={s.get('x1')*PROPORTION} y1={s.get('y1')*PROPORTION} x2={s.get('x2')*PROPORTION} y2={s.get('y2')*PROPORTION} stroke="#cacaca"/>); break;
        case 'text': svgParts.push(<text x={s.get('x1')*PROPORTION} y={s.get('y1')*PROPORTION} fill="#cacaca" fontSize="4">Hi!</text>); break;
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
