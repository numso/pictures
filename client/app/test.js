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
