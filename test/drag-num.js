var $ = require('./select');

var originalX;
var originalNum = 5;
var curNum = 5;
var step = 1;
$('num-dragger').addEventListener('dragstart', function (e) {
  originalNum = +$('num-dragger').innerText;
  originalX = e.x;
  if (originalNum < 1) step = .03;
  else if (originalNum < 50) step = 1;
  else if (originalNum < 100) step = 5;
  else step = 10;
  e.dataTransfer.setDragImage($('blank'), 0, 0);
  e.dataTransfer.effectAllowed = 'none';
  document.body.style.cursor = 'ew-resize';
});


$('num-dragger').addEventListener('drag', function (e) {
  if (e.x === 0) return;
  var delta = e.x - originalX;
  var num = Math.floor(originalNum + (delta / 20) * step);
  if (num !== curNum) {
    curNum = num;
    $('num-dragger').innerText = curNum;
  }
});

$('num-dragger').addEventListener('dragend', function (e) {
  document.body.style.cursor = 'default';
});
