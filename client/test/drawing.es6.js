// --- set up globals ----------------------------------------------------------

var d3 = require('d3');
var $ = require('jquery');

var size = 500;
var blue = '#56a7e1';
var grey = '#cacaca';

var type = 'circle';
var mode = 'create';

var startx = null;
var starty;

// --- set up buttons ----------------------------------------------------------

$('#demo5 .type').click(function () {
  switch (type) {
    case 'circle': type = 'square'; break;
    case 'square': type = 'line'; break;
    default: type = 'circle';
  }
  $(this).text(type + 's')
});

$('#demo5 .mode').click(function () {
  switch (mode) {
    case 'create': mode = 'update'; break;
    default: mode = 'create';
  }
  $(this).text(mode);
});

$('#demo5 .clear').click(clearAll);

// --- set up svg --------------------------------------------------------------

var svg = d3.select('#picture-box').append('svg')
  .attr('width', size)
  .attr('height', size);

svg.append('circle').attr('class', 'preview-circle');
svg.append('rect').attr('class', 'preview-rect');
svg.append('line').attr('class', 'preview-line');

// --- shape drawing functions -------------------------------------------------

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

function drawGuide(x, y, update) {
  svg.append('circle')
    .attr('class', 'guide')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 5)
    .attr('fill', blue)
    .on('mousedown', function (e) {
      // set selected
      // then, on mouse move, set it if selected
      update && update(d3.event.offsetX, d3.event.offsetY);
    });
}

function clearAll() {
  svg.selectAll('.real-rect').remove();
  svg.selectAll('.real-circle').remove();
  svg.selectAll('.real-line').remove();
  svg.selectAll('.guide').remove();
}

// --- bound svg events --------------------------------------------------------

svg.on('mousedown', function (e) {
  if (mode === 'create') mouseDownCreate(e);
  if (mode === 'update') mouseDownUpdate(e);
});

svg.on('mousemove', function (e) {
  if (mode === 'create') mouseMoveCreate(e);
  if (mode === 'update') mouseMoveUpdate(e);
});

svg.on('mouseup', function (e) {
  if (mode === 'create') mouseUpCreate(e);
  if (mode === 'update') mouseUpUpdate(e);
});

// --- create event methods ----------------------------------------------------

function mouseDownCreate(e) {
  startx = d3.event.offsetX;
  starty = d3.event.offsetY;
}

function mouseMoveCreate(e) {
  if (startx === null) return;
  var endx = d3.event.offsetX;
  var endy = d3.event.offsetY;
  if (type === 'circle') {
    var mid = midpoint(startx, starty, endx, endy);
    var dist = distance(startx, starty, endx, endy);
    drawCirclePreview(mid.x, mid.y, dist / 2);
  } else  if (type === 'square') {
    var x = Math.min(startx, endx);
    var y = Math.min(starty, endy);
    var w = Math.abs(startx - endx);
    var h = Math.abs(starty - endy);
    drawRectPreview(x, y, w, h);
  } else {
    drawLinePreview(startx, starty, endx, endy);
  }
}

function mouseUpCreate(e) {
  var endx = d3.event.offsetX;
  var endy = d3.event.offsetY;
  if (type === 'circle') {
    var mid = midpoint(startx, starty, endx, endy);
    var dist = distance(startx, starty, endx, endy);
    drawCircle(mid.x, mid.y, dist / 2);
    drawCirclePreview(0, 0, 0);
  } else if (type === 'square') {
    var x = Math.min(startx, endx);
    var y = Math.min(starty, endy);
    var w = Math.abs(startx - endx);
    var h = Math.abs(starty - endy);
    drawRect(x, y, w, h);
    drawRectPreview(0, 0, 0, 0);
  } else {
    drawLine(startx, starty, endx, endy);
    drawLinePreview(0, 0, 0, 0);
  }
  startx = null;
}

// --- update event methods ----------------------------------------------------

function mouseDownUpdate(e) {

}

function mouseMoveUpdate(e) {

}

function mouseUpUpdate(e) {

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
