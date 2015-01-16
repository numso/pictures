var {component} = require('omniscient-tools');
var Immutable = require('immutable');
var _ = require('lodash');

var Tag = require('./tag');
var CreateTag = require('./create-tag');
var ScalarVal = require('./scalar-val');
var ArrayVal = require('./array-val');

var evaluator = require('./evaluator');

var pictureStore = require('../pictures/store');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

module.exports = component(function ({pictureData, selectedPicture}) {

  console.log('-------RENDER--------');

  function createScalar() {
    createNew('scalars');
  }

  function createArray() {
    createNew('arrays');
  }

  function createNew(type) {
    pictureData.get(type).update((oldArr) => {
      return oldArr.push(Immutable.fromJS({ label: 'item', value: '10' }));
    });
    pictureStore.updatePicture(selectedPicture.get('current'));
  }

  function getArrayStats(item) {
    var stats = [
      { name: 'min', code: function (arr) { return Math.min.apply(this, arr); } },
      { name: 'avg', code: function (arr) { return arr.reduce(function (memo, num) { return memo + num}, 0) / arr.length; } },
      { name: 'max', code: function (arr) { return Math.max.apply(this, arr); } },
      { name: 'sum of', code: function (arr) { return arr.reduce(function (memo, num) { return memo + num}, 0); } },
      { name: '# of', code: function (arr) { return arr.length; } }
    ];
    return (
      <div className="test-box">
        {stats.map((stat) => {
          return (
            <div>
              <div className="tag" draggable="true">{stat.name} {item.get('label')}</div>
              <span>{evaluator.round(stat.code(item.get('evaluated') || []))}</span>
            </div>
          );
        })}
      </div>
    );
  }

  var max = pictureData.get('arrays').toJS().reduce((memo, item) => {
    return Math.max(memo, getArr(item.evaluated).length);
  }, 0);
  var indices = _.range(1, Math.max(max + 1, 6));

  var scalarTags = pictureData.get('scalars').map((item) => {
    return <Tag item={item}/>
  }).toJS();

  var arrayTags = pictureData.get('arrays').map((item) => {
    return <Tag item={item}>{getArrayStats(item)}</Tag>
  }).toJS();

  var scalarValues = pictureData.get('scalars').map((item) => {
    return <ScalarVal pictureData={pictureData} picID={selectedPicture.get('current')} item={item}/>
  }).toJS();
  var arrayValues = pictureData.get('arrays').map((item) => {
    return <ArrayVal pictureData={pictureData} picID={selectedPicture.get('current')} item={item}/>;
  }).toJS();

  return (
    <div className="data">
      <div className="header">Data</div>
      <div className="container --data --flex">
        <div>
          {scalarTags}
          <CreateTag onClick={createScalar}>+</CreateTag>
          <CreateTag>column</CreateTag>
          {arrayTags}
          <CreateTag onClick={createArray}>+</CreateTag>
        </div>
        <div className="test-1">
          {scalarValues}
          <div style={{minHeight: 22}}></div>
          <div className="arr-section">
            <div>{indices.map((i) => { return <div className="data__indice --header">{i}</div>; })}</div>
            {arrayValues}
          </div>
        </div>
      </div>
    </div>
  );

});
