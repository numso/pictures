var Dragger = require('../data/dragger');

exports.generateValueMarkup = function (val, item, pictureData, picID) {
  val = '' + val;
  var map = exports.getMap(pictureData);
  var re = /[as]_[0-9]*/;
  var chunks = val.split(/\s/);

  return _.map(chunks, (chunk, i, arr) => {
    if (re.test(chunk)) {
      return (<div className="tag">{map[chunk]}</div>);
    }
    if (!isNaN(parseFloat(chunk))) {
      var firstChunk = arr.slice(0, i).join(' ');
      var secondChunk = arr.slice(i + 1, arr.length).join(' ');
      return <Dragger number={chunk} firstChunk={firstChunk} secondChunk={secondChunk} item={item} picID={picID}/>
    }
    return (<span> {chunk} </span>);
  });
};

exports.getMap = function (pictureData) {
  var obj = {};
  for (var i = 0; i < pictureData.get('scalars').size; i++) {
    var item = pictureData.get('scalars').get(i);
    obj[item.get('id')] = item.get('label');
  }
  for (var i = 0; i < pictureData.get('arrays').size; i++) {
    var item = pictureData.get('arrays').get(i);
    obj[item.get('id')] = item.get('label');
  }
  return obj;
};
