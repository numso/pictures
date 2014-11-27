require('./test.css');

var $ = document.getElementById.bind(document);

var obj = {
  tag: 'yayahoo',
  foo: 'whazzep',
  bar: 'supdudes'
};

var revobj = {
  'yayahoo': 'tag',
  'whazzep': 'foo',
  'supdudes': 'bar'
};


var val = 'This is a {tag} test. {foo} a';
update();

$('raw').addEventListener('input', function (e) {
  val = e.target.innerText;
  update();
});

$('proc').addEventListener('input', function (e) {
  val = untag(e.target.innerHTML)
  update();
});

$('obj').addEventListener('input', function (e) {
  try {
    obj = JSON.parse(e.target.innerText);
    update();
  } catch (e) {}
});







function update() {
  $('obj').textContent = JSON.stringify(obj);
  $('raw').textContent = val;
  if ($('proc').innerHTML !== tag(val)) $('proc').innerHTML = tag(val);
  if ($('proc').innerHTML.substr($('proc').innerHTML.length - 7) === '</span>') {
    $('proc').innerHTML += '&nbsp;';
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(document.createRange());
  }
}

function tag(str) {
  var html = str;
  var re = /\{(\S*)\}/g;
  var test = re.exec(str);
  while (test) {
    var id = test[1];
    var strr = obj[id] || id;
    var ree = new RegExp('\{' + id + '\}');
    html = html.replace(ree, '<span class="tag">' + strr + '</span>')
    test = re.exec(str);
  }
  return html;
}

function untag(html) {
  var str = html;
  var re = /<span class="tag">(\S*)<\/span>/g;
  var test = re.exec(html);
  while (test) {
    var id = test[1];
    var strr = revobj[id] || id;
    var ree = new RegExp('<span class="tag">' + id + '<\/span>');
    str = str.replace(ree, '{' + strr + '}')
    test = re.exec(html);
  }
  return str;
}










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
