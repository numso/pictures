var {component} = require('omniscient-tools');
var Immutable = require('immutable');
var _ = require('lodash');

var Tag = require('./tag');
var CreateTag = require('./create-tag');
var ScalarVal = require('./scalar-val');
var ArrayVal = require('./array-val');

var evaluator = require('./evaluator');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

function giveIDs(dataCursor) {
  var scalars_id = dataCursor.get('scalars_id');
  var len = dataCursor.get('scalars').size;
  for (var i = 0; i < len; i++) {
    var item = dataCursor.get('scalars').get(i);
    if (!item.get('id')) {
      item.update('id', () => ('s_' + scalars_id++));
    }
  }
  dataCursor.update('scalars_id', () => scalars_id);

  var arrays_id = dataCursor.get('arrays_id');
  for (var i = 0; i < dataCursor.get('arrays').size; i++) {
    var item = dataCursor.get('arrays').get(i);
    if (!item.get('id')) {
      item.update('id', () => ('a_' + arrays_id++));
    }
  }
  dataCursor.update('arrays_id', () => arrays_id);
}

module.exports = component(function ({pictureData, selectedPicture}) {

  console.log('-------RENDER--------');

  // THIS FUNCTION NEEDS MAJOR WORK
  giveIDs(pictureData);
  evaluate(pictureData);

  function evaluate(dataCursor) {
    var ctx = {};
    for (var i = 0; i < pictureData.get('scalars').size; i++) {
      var item = pictureData.get('scalars').get(i);
      ctx[item.get('id')] = item.get('value');
    }
    for (var i = 0; i < pictureData.get('arrays').size; i++) {
      var item = pictureData.get('arrays').get(i);
      ctx[item.get('id')] = item.get('value');
    }
    var data = evaluator.check(ctx);
    for (var i = 0; i < pictureData.get('scalars').size; i++) {
      var item = pictureData.get('scalars').get(i);
      var id = item.get('id');
      item.update('evaluated', () => data[id]);
    }
    // for (var i = 0; i < pictureData.get('arrays').size; i++) {
    //   var item = pictureData.get('arrays').get(i);
    //   // only update if it's not already updated....
    //   item.update('evaluated', () => data[item.get('id')]);
    // }
  }

  function createScalar() {
    createNew('scalars');
  }

  function createArray() {
    createNew('arrays');
  }

  console.log('TODO:: Fix these methods as well');
  function createNew(type) {
    pictureData.get(type).update((oldArr) => {
      // IT NEEDS A GENERATED ID
      return oldArr.push(Immutable.fromJS({ id: 's_4', label: 'item', value: '10' }));
    });
    evaluate(pictureData);
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
              <div className="tag" draggable="true">{stat.name} {item.label}</div>
              <span>{evaluator.round(stat.code(item.evaluated || []))}</span>
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

  var tags = [];
  _.each(pictureData.get('scalars').toJS(), (item) => {
    tags.push(<Tag item={item}/>);
  });
  tags.push(<CreateTag onClick={createScalar}>+</CreateTag>);
  tags.push(<CreateTag>column</CreateTag>);
  _.each(pictureData.get('arrays').toJS(), (item) => {
    tags.push(<Tag item={item}>{getArrayStats(item)}</Tag>);
  });
  tags.push(<CreateTag onClick={createArray}>+</CreateTag>);

  var scalarValues = pictureData.get('scalars').map((item) => {
    return <ScalarVal picID={selectedPicture.get('current')} item={item}/>
  }).toJS();
  var arrayValues = pictureData.get('arrays').map((item) => {
    return <ArrayVal picID={selectedPicture.get('current')} item={item}/>;
  }).toJS();

  return (
    <div className="data">
      <div className="header">Data</div>
      <div className="container --data --flex">
        <div>
          {tags}
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
