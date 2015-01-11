var {component} = require('omniscient-tools');
var immutable = require('immutable');
var {generateParts} = require('../common/drawing');

var startx = null;
var starty;

module.exports = component(function ({mode, steps, bigPictureStuff}) {

  function mouseDown(e) {
    startx = e.nativeEvent.offsetX;
    starty = e.nativeEvent.offsetY;
  }

  function mouseMove(e) {
    var _mode = mode.get('current');
    if (startx === null) return;
    var endx = e.nativeEvent.offsetX;
    var endy = e.nativeEvent.offsetY;
    if (_mode === 'circle') {
      var dist = distance(startx, starty, endx, endy);
      setPreview('circle', { type: 'circle', x1: startx, y1: starty, r: dist });
      bigPictureStuff.update('msg', () => `Draw circle around (${startx}, ${starty}), ${Math.floor(dist)} px in radius.`);
    } else  if (_mode === 'rect') {
      setPreview('rect', { type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
      bigPictureStuff.update('msg', () => `Draw rect from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`);
    } else if (_mode === 'line') {
      setPreview('line', { type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
      bigPictureStuff.update('msg', () => `Draw line from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`);
    }
  }

  function mouseUp(e) {
    var _mode = mode.get('current');
    var endx = e.nativeEvent.offsetX;
    var endy = e.nativeEvent.offsetY;
    if (_mode === 'circle') {
      var dist = distance(startx, starty, endx, endy);
      addStep({ type: 'circle', x1: startx, y1: starty, r: dist });
    } else if (_mode === 'rect') {
      addStep({ type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
    } else if (_mode === 'line') {
      addStep({ type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
    } else if (_mode === 'text') {
      bigPictureStuff.update('msg', () => `Draw text at (${endx}, ${endy})`);
      addStep({ type: 'text', x1: endx, y1: endy });
    }
    startx = null;
  }

  function distance(x, y, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
  }

  function addStep(step) {
    steps.update((oldSteps) => {
      return oldSteps.push(immutable.fromJS(step));
    });
  }

  function setPreview(key, preview) {
    bigPictureStuff.get('previews').update(key, () => immutable.fromJS(preview));
  }

  var svgParts = generateParts(steps);
  var previewParts = generateParts(bigPictureStuff.get('previews'));

  return (
    <div>
      <div style={{textAlign: 'center', height: 18}}>{bigPictureStuff.get('msg')}</div>
      <div id="picture-box" className="picture --big">
        <svg width={720} height={900} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
          {svgParts}
          {previewParts}
        </svg>
      </div>
    </div>
  );

});
