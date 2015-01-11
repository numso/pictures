var {component} = require('omniscient-tools');
var immutable = require('immutable');

var startx = null;
var starty;

// --- create event methods ----------------------------------------------------

function mouseDown(e) {
  startx = e.nativeEvent.offsetX;
  starty = e.nativeEvent.offsetY;
}

function mouseMove(mode, bigPictureStuff) {
  return function (e) {
    var _mode = mode.get('current');
    if (startx === null) return;
    var endx = e.nativeEvent.offsetX;
    var endy = e.nativeEvent.offsetY;
    if (_mode === 'circle') {
      var dist = distance(startx, starty, endx, endy);
      setPreview(bigPictureStuff, 'circle', { type: 'circle', x1: startx, y1: starty, r: dist });
      bigPictureStuff.update('msg', () => `Draw circle around (${startx}, ${starty}), ${Math.floor(dist)} px in radius.`);
    } else  if (_mode === 'rect') {
      setPreview(bigPictureStuff, 'rect', { type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
      bigPictureStuff.update('msg', () => `Draw rect from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`);
    } else if (_mode === 'line') {
      setPreview(bigPictureStuff, 'line', { type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
      bigPictureStuff.update('msg', () => `Draw line from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`);
    }
  };
}

function mouseUp(mode, bigPictureStuff, steps) {
  return function (e) {
    var _mode = mode.get('current');
    var endx = e.nativeEvent.offsetX;
    var endy = e.nativeEvent.offsetY;
    if (_mode === 'circle') {
      var dist = distance(startx, starty, endx, endy);
      addStep(steps, { type: 'circle', x1: startx, y1: starty, r: dist });
    } else if (_mode === 'rect') {
      addStep(steps, { type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
    } else if (_mode === 'line') {
      addStep(steps, { type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
    } else if (_mode === 'text') {
      bigPictureStuff.update('msg', () => `Draw text at (${endx}, ${endy})`);
      addStep(steps, { type: 'text', x1: endx, y1: endy });
    }
    startx = null;
  };
}

// --- helper functions --------------------------------------------------------

function distance(x, y, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
}

function addStep(steps, step) {
  steps.update((oldSteps) => {
    return oldSteps.push(immutable.fromJS(step));
  });
}

function setPreview(bigPictureStuff, key, preview) {
  bigPictureStuff.get('previews').update(key, () => immutable.fromJS(preview));
}

function getSVGParts(steps) {
  var svgParts = [];
  steps.map((s) => {
    switch (s.get('type')) {
      case 'circle': svgParts.push(<circle cx={s.get('x1')} cy={s.get('y1')} r={s.get('r')} fill="#cacaca"/>); break;
      case 'rect':
        var x = Math.min(s.get('x1'), s.get('x2'));
        var y = Math.min(s.get('y1'), s.get('y2'));
        var w = Math.abs(s.get('x1') - s.get('x2'));
        var h = Math.abs(s.get('y1') - s.get('y2'));
        svgParts.push(<rect x={x} y={y} width={w} height={h} fill="#cacaca"/>);
        break;
      case 'line': svgParts.push(<line x1={s.get('x1')} y1={s.get('y1')} x2={s.get('x2')} y2={s.get('y2')} stroke="#cacaca"/>); break;
      case 'text': svgParts.push(<text x={s.get('x1')} y={s.get('y1')} fill="#cacaca">Hi!</text>); break;
    }
  }).toJS();
  return svgParts;
}

module.exports = component(function ({mode, steps, bigPictureStuff}) {

  var svgParts = getSVGParts(steps);
  var previewParts = getSVGParts(bigPictureStuff.get('previews'));

  return (
    <div>
      <div style={{textAlign: 'center', height: 18}}>{bigPictureStuff.get('msg')}</div>
      <div id="picture-box" className="picture --big">
        <svg width={720} height={900} onMouseDown={mouseDown} onMouseUp={mouseUp(mode, bigPictureStuff, steps)} onMouseMove={mouseMove(mode, bigPictureStuff)}>
          {svgParts}
          {previewParts}
        </svg>
      </div>
    </div>
  );

});
