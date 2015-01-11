var immutable = require('immutable');
var React = require('react');

var thiz;

var blue = '#56a7e1';
var grey = '#cacaca';

var startx = null;
var starty;

// --- create event methods ----------------------------------------------------

function mouseDown(e) {
  startx = e.nativeEvent.offsetX;
  starty = e.nativeEvent.offsetY;
}

function mouseMove(e) {
  var mode = thiz.props.mode.get('current');
  if (startx === null) return;
  var endx = e.nativeEvent.offsetX;
  var endy = e.nativeEvent.offsetY;
  if (mode === 'circle') {
    var dist = distance(startx, starty, endx, endy);
    setPreview('circle', { type: 'circle', x1: startx, y1: starty, r: dist });
    thiz.props.bigPictureStuff.update('msg', () => `Draw circle around (${startx}, ${starty}), ${Math.floor(dist)} px in radius.`);
  } else  if (mode === 'rect') {
    setPreview('rect', { type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
    thiz.props.bigPictureStuff.update('msg', () => `Draw rect from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`);
  } else if (mode === 'line') {
    setPreview('line', { type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
    thiz.props.bigPictureStuff.update('msg', () => `Draw line from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`);
  }
}

function mouseUp(e) {
  var mode = thiz.props.mode.get('current');
  var endx = e.nativeEvent.offsetX;
  var endy = e.nativeEvent.offsetY;
  if (mode === 'circle') {
    var dist = distance(startx, starty, endx, endy);
    addStep({ type: 'circle', x1: startx, y1: starty, r: dist });
  } else if (mode === 'rect') {
    addStep({ type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
  } else if (mode === 'line') {
    addStep({ type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
  } else if (mode === 'text') {
    thiz.props.bigPictureStuff.update('msg', () => `Draw text at (${endx}, ${endy})`);
    addStep({ type: 'text', x1: endx, y1: endy });
  }
  startx = null;
}

// --- helper functions --------------------------------------------------------

function midpoint(x, y, x2, y2) {
  return {
    x: (x + x2) / 2,
    y: (y + y2) / 2
  };
}

function distance(x, y, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
}

function addStep(step) {
  thiz.props.steps.update((oldSteps) => {
    return oldSteps.push(immutable.fromJS(step));
  });
}

function setPreview(key, preview) {
  thiz.props.bigPictureStuff.get('previews').update(key, () => immutable.fromJS(preview));
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
      case 'text': svgParts.push(<text x={s.get('x1')} y={s.get('y1')} fill="#cacaca" fontSize="4">Hi!</text>); break;
    }
  }).toJS();
  return svgParts;
}

var BigPicture = React.createClass({

  componentDidMount() {
    thiz = this;
  },

  render() {
    thiz = this;
    var svgParts = getSVGParts(thiz.props.steps);
    var previewParts = getSVGParts(thiz.props.bigPictureStuff.get('previews'));

    return (
      <div>
        <div style={{textAlign: 'center', height: 18}}>{this.props.bigPictureStuff.get('msg')}</div>
        <div id="picture-box" className="picture --big">
          <svg width={720} height={900} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
            {svgParts}
            {previewParts}
          </svg>
        </div>
      </div>
    );
  }

});

module.exports = BigPicture;
