var store = require('./store');
document.addEventListener('keydown', (e) => {
  var item = store.getItemFor(e.keyCode);
  if (!item) return;
  store.state.cursor('mode').update('current', () => item.get('label'));
});
