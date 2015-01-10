var immutable = require('immutable');
var React = require('react');
var d3 = require('d3');

var svg;
var thiz;

var blue = '#56a7e1';
var grey = '#cacaca';

var startx = null;
var starty;


function drawCircle(x, y, r) {
  svg.append('circle')
    .attr('class', 'real-circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', r)
    .attr('fill', grey);

  drawGuide(x, y + r);
  drawGuide(x, y - r);
  drawGuide(x + r, y);
  drawGuide(x - r, y);
}

function drawCirclePreview(x, y, r) {
  svg.select('.preview-circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', r)
    .attr('fill', grey);
}

function drawRect(x, y, w, h) {
  svg.append('rect')
    .attr('class', 'real-rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', w)
    .attr('height', h)
    .attr('fill', grey);

  drawGuide(x, y);
  drawGuide(x + w / 2, y);
  drawGuide(x + w, y);

  drawGuide(x, y + h / 2);
  drawGuide(x + w, y + h / 2);

  drawGuide(x, y + h);
  drawGuide(x + w / 2, y + h);
  drawGuide(x + w, y + h);
}

function drawRectPreview(x, y, w, h) {
  svg.select('.preview-rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', w)
    .attr('height', h)
    .attr('fill', grey);
}

function drawLine(x, y, x2, y2) {
  var id = 'rect-' + Math.floor(Math.random() * 99999);

  svg.append('line')
    .attr('class', 'real-line')
    .attr('class', id)
    .attr('x1', x)
    .attr('y1', y)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke', grey);

  var mid = midpoint(...arguments);

  drawGuide(x, y);
  drawGuide(mid.x, mid.y);
  drawGuide(x2, y2, function (x, y) {
    svg.select('.' + id)
      .attr('x2', x)
      .attr('y2', y);
  });
}

function drawLinePreview(x, y, x2, y2) {
  svg.select('.preview-line')
    .attr('x1', x)
    .attr('y1', y)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke', grey);
}

function drawText(x, y, x2, y2) {
  svg.append('text')
    .attr('x', x2)
    .attr('y', y2)
    .text('Hi!');
}

function drawGuide(x, y, update) {
  var id = 'guide-' + Math.floor(Math.random() * 99999);
  svg.append('circle')
    .attr('class', 'guide')
    .attr('class', id)
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 5)
    .attr('fill', blue)
    .on('mousemove', function (e) {
      // set selected
      // then, on mouse move, set it if selected
      update && update(d3.event.offsetX, d3.event.offsetY);
      svg.select('.' + id)
        .attr('cx', d3.event.offsetX)
        .attr('cy', d3.event.offsetY);
      // redraw guides...
    });
}

// --- create event methods ----------------------------------------------------

function mouseDown(e) {
  startx = d3.event.offsetX;
  starty = d3.event.offsetY;
}

function mouseMove(e) {
  var mode = thiz.props.mode.get('current');
  if (startx === null) return;
  var endx = d3.event.offsetX;
  var endy = d3.event.offsetY;
  if (mode === 'circle') {
    var dist = distance(startx, starty, endx, endy);
    drawCirclePreview(startx, starty, dist);
    thiz.setState({
      msg: `Draw circle around (${startx}, ${starty}), ${Math.floor(dist)} px in radius.`
    });
  } else  if (mode === 'rect') {
    var x = Math.min(startx, endx);
    var y = Math.min(starty, endy);
    var w = Math.abs(startx - endx);
    var h = Math.abs(starty - endy);
    drawRectPreview(x, y, w, h);
    thiz.setState({
      msg: `Draw rect from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`
    });
  } else if (mode === 'line') {
    drawLinePreview(startx, starty, endx, endy);
    thiz.setState({
      msg: `Draw line from (${startx}, ${starty}), ${endx - startx} px horizontally, ${endy - starty} px vertically.`
    });
  }
}

function mouseUp(e) {
  var mode = thiz.props.mode.get('current');
  var endx = d3.event.offsetX;
  var endy = d3.event.offsetY;
  if (mode === 'circle') {
    var dist = distance(startx, starty, endx, endy);
    drawCircle(startx, starty, dist);
    drawCirclePreview(0, 0, 0);
    addStep({ type: 'circle', x1: startx, y1: starty, r: dist });
  } else if (mode === 'rect') {
    var x = Math.min(startx, endx);
    var y = Math.min(starty, endy);
    var w = Math.abs(startx - endx);
    var h = Math.abs(starty - endy);
    drawRect(x, y, w, h);
    drawRectPreview(0, 0, 0, 0);
    addStep({ type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy });
  } else if (mode === 'line') {
    drawLine(startx, starty, endx, endy);
    drawLinePreview(0, 0, 0, 0);
    addStep({ type: 'line', x1: startx, y1: starty, x2: endx, y2: endy });
  } else if (mode === 'text') {
    drawText(startx, starty, endx, endy);
    thiz.setState({
      msg: `Draw text at (${endx}, ${endy})`
    });
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


var BigPicture = React.createClass({

  componentDidMount() {
    svg = d3.select('#picture-box').append('svg')
      .attr('width', 720)
      .attr('height', 900);

    svg.append('circle').attr('class', 'preview-circle');
    svg.append('rect').attr('class', 'preview-rect');
    svg.append('line').attr('class', 'preview-line');

    svg.on('mousedown', mouseDown);
    svg.on('mousemove', mouseMove);
    svg.on('mouseup', mouseUp);
    thiz = this;
  },

  getInitialState() {
    return {
      msg: ''
    };
  },

  render() {
    return (
      <div>
        <div style={{textAlign: 'center', height: 18}}>{this.state.msg}</div>
        <div id="picture-box" className="picture --big"></div>
      </div>
    );
  }

});

module.exports = BigPicture;
