require('./style');

require('./tags');
require('./drag-num');
require('./drawing');


var $ = require('jquery');

$('h1').click(function () {
  $(this).closest('div').find('.demo-box').toggle()
  var pm = $(this).find('.plus-minus');
  pm.text(pm.text() === '+' ? '-' : '+');
});
