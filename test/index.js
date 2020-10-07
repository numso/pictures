import $ from 'jquery'

import './tags'
import './drag-num'
import './drawing'

$('h1').click(function () {
  $(this)
    .closest('div')
    .find('.demo-box')
    .toggle()
  var pm = $(this).find('.plus-minus')
  pm.text(pm.text() === '+' ? '-' : '+')
})
