require('./style');

require('./tags');
require('./drag-num');


var $ = require('jquery');

$('h1').click(function () {
  $(this).closest("div").find('.demo-box').toggle()
});
