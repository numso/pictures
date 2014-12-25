var d3 = require('d3');
var $ = require('jquery');

var blue = '#56a7e1';
var grey = '#cacaca';

var type = 'circle';
$('#demo5 .type').click(function () {
  switch (type) {
    case 'circle': type = 'square'; break;
    case 'square': type = 'line'; break;
    default: type = 'circle';
  }
  $(this).text(type + 's')
});

$('#demo5 .clear').click(clearAll);

var svg = d3.select('#picture-box').append('svg')
  .attr('width', 500)
  .attr('height', 500);

svg.append('circle').attr('class', 'preview-circle');
svg.append('rect').attr('class', 'preview-rect');
svg.append('line').attr('class', 'preview-line');

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
  svg.append('line')
    .attr('class', 'real-line')
    .attr('x1', x)
    .attr('y1', y)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke', grey);

  drawGuide(x, y);
  drawGuide((x + x2) / 2, (y + y2) / 2);
  drawGuide(x2, y2);
}

function drawLinePreview(x, y, x2, y2) {
  svg.select('.preview-line')
    .attr('x1', x)
    .attr('y1', y)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke', grey);
}

function drawGuide(x, y) {
  svg.append('circle')
    .attr('class', 'guide')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 5)
    .attr('fill', blue);
}

function clearAll() {
  svg.selectAll('.real-rect').remove();
  svg.selectAll('.real-circle').remove();
  svg.selectAll('.real-line').remove();
  svg.selectAll('.guide').remove();
}


var startx = null, starty;

svg.on('mousedown', function (e) {
  startx = d3.event.offsetX;
  starty = d3.event.offsetY;
});

svg.on('mousemove', function (e) {
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
});

svg.on('mouseup', function (e) {
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
});

function midpoint(x, y, x2, y2) {
  return {
    x: (x + x2) / 2,
    y: (y + y2) / 2
  };
}

function distance(x, y, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
}
