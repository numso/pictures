var React = require('react');
var _ = require('lodash');

var Scalar = require('./scalar');
var Arrayy = require('./arrayy');

var evaluator = require('./evaluator');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

var GLOBALS = {
  arrays: 1,
  scalars: 1
};
function getID(type) {
  return type[0] + '_1_' + GLOBALS[type]++;
}

function giveInitialIDs(state) {
  _.each(state.scalars, (item) => { item.id = getID('scalars'); });
  _.each(state.arrays, (item) => { item.id = getID('arrays'); });
}

var Data = React.createClass({

  getInitialState() {
    // var state = {
    //   scalars: [{ label: 'parameter', value: '1' }],
    //   arrays: [{ label: 'item', value: '[1,2,3,4,5]' }]
    // };
    var state = {
      "scalars": [
        { label: 'panels', value: '600', },
        { label: 'kW / panel', value: '0.2', },
        { label: 'power in kW', value: 's_1_1 * s_1_2', },
        // { label: 'max in array 1', value: 'ar_1_1_max' }
      ],
      'arrays': [
        { label: 'sun hours', value: '[53, 86,134, 155, 159, 155, 130, 143, 126, 112, 81, 65]', },
        { label: 'energy in kWh', value: 's_1_3 * a_1_1', },
        { label: 'energy in MWh', value: 'a_1_2 / 1000' },
        // { label: 'foo', value: 'a_1_1 / ar_1_1_max' }
      ]
    };
    giveInitialIDs(state);
    this.evaluate(state);
    return state;
  },

  evaluate(state=this.state) {
    var ctx = {};
    _.each(state.scalars, (item) => {
      ctx[item.id] = item.value;
    });
    _.each(state.arrays, (item) => {
      ctx[item.id] = item.value;
    });
    var data = evaluator.check(ctx);
    _.each(state.scalars, (item) => {
      item.evaluated = data[item.id];
    });
    _.each(state.arrays, (item) => {
      item.evaluated = data[item.id];
    });
  },

  createNew(type) {
    var value = { id: getID(type) };
    this.state[type].push(value);
    this.setState({ [type]: this.state[type] });
  },

  onTitleChange(i, type, newText) {
    this.state[type][i].label = newText;
    this.setState({ [type]: this.state[type] });
  },

  onValueChange(i, type, newText) {
    this.state[type][i].value = newText;
    this.evaluate();
    this.setState({ [type]: this.state[type] });
  },

  render() {
    var s = this.state.scalars.map((item, i) => {
      return <Scalar item={item}
                     onTitleChange={this.onTitleChange.bind(this, i, 'scalars')}
                     onValueChange={this.onValueChange.bind(this, i, 'scalars')}/>
    });

    var a = this.state.arrays.map((item, i) => {
      return <Arrayy item={item}
                     onTitleChange={this.onTitleChange.bind(this, i, 'arrays')}
                     onValueChange={this.onValueChange.bind(this, i, 'arrays')}/>
    });

    var max = this.state.arrays.reduce((memo, item) => {
      return Math.max(memo, getArr(item.evaluated).length);
    }, 0);
    var indices = _.range(1, max + 1);

    return (
      <div className="data">
        <div className="header">Data</div>
        <div className="container --data">
          <div id="scalars">
            {s}
            <span onClick={this.createNew.bind(this, 'scalars')} className="tag --create">+</span>
          </div>


          <div style={{marginLeft: 140}}>{indices.map((i) => { return <div className="data__indice --header">{i}</div>; })}</div>
          <div id="arrays">
            {a}
            <span onClick={this.createNew.bind(this, 'arrays')} className="tag --create">+</span>
          </div>
        </div>
        <div className="header">Results</div>
        <div className="container --data">
          <pre>{JSON.stringify(this.state, 2, 2)}</pre>
        </div>
      </div>
    );
  }

});

module.exports = Data;
