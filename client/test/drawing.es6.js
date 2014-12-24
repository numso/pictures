var d3 = require('d3');
var $ = require('jquery');

var blue = '#56a7e1';
var grey = '#cacaca';

var type = 'circle';
$('#demo5 .type').click(function () {
  type = type === 'circle' ? 'square' : 'circle';
  $(this).text(type + 's')
});

$('#demo5 .clear').click(clearAll);

var svg = d3.select('#picture-box').append('svg')
  .attr('width', 500)
  .attr('height', 500);

svg.append('circle').attr('class', 'preview-circle');
svg.append('rect').attr('class', 'preview-rect');

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

function drawPreview(x, y, r) {
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
    drawPreview(mid.x, mid.y, dist / 2);
  } else {
    var x = Math.min(startx, endx);
    var y = Math.min(starty, endy);
    var w = Math.abs(startx - endx);
    var h = Math.abs(starty - endy);
    drawRectPreview(x, y, w, h);
  }
});

svg.on('mouseup', function (e) {
  var endx = d3.event.offsetX;
  var endy = d3.event.offsetY;
  if (type === 'circle') {
    var mid = midpoint(startx, starty, endx, endy);
    var dist = distance(startx, starty, endx, endy);
    drawCircle(mid.x, mid.y, dist / 2);
    drawPreview(0, 0, 0);
  } else {
    var x = Math.min(startx, endx);
    var y = Math.min(starty, endy);
    var w = Math.abs(startx - endx);
    var h = Math.abs(starty - endy);
    drawRect(x, y, w, h);
    drawRectPreview(0, 0, 0, 0);
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
