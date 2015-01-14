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

module.exports = component(function ({pictureData, selectedPicture}) {

  console.log('-------RENDER--------');

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
