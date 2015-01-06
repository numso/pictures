var React = require('react');
var _ = require('lodash');

var Tag = require('./tag');
var CreateTag = require('./create-tag');
var ScalarVal = require('./scalar-val');
var ArrayVal = require('./array-val');

var store = require('../stores/pictures');
var evaluator = require('./evaluator');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

function giveIDs(state) {
  _.each(state.scalars, (item) => {
    if (item.id) return;
    item.id = 's_' + state.scalars_id++;
  });
  _.each(state.arrays, (item) => {
    if (item.id) return;
    item.id = 'a_' + state.arrays_id++;
  });
}

var Data = React.createClass({

  getInitialState() {
    return {
      scalars: [],
      arrays: [],
      scalars_id: 1,
      arrays_id: 1
    };
  },

  getDefaultProps() {
    return {
      pictureID: 0
    };
  },

  loadPicture(props=this.props) {
    var picture = store.getData(props.pictureID);
    giveIDs(picture);
    this.evaluate(picture);
    this.setState(picture);
  },

  componentWillReceiveProps(nextProps) {
    this.loadPicture(nextProps);
  },

  componentDidMount() {
    store.watch(this.picWillUpdate);
    this.loadPicture();
  },

  picWillUpdate() {
    console.log('PICTURE IS TRYING TO UPDATE');
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

  createScalar() {
    console.log('creating new scalar')
    this.createNew('scalars');
  },

  createArray() {
    this.createNew('arrays');
  },

  createNew(type) {
    this.state[type].push({ label: 'item', value: 0 });
    giveIDs(this.state);
    var picture = store.getData(this.props.pictureID);
    picture.scalars_id = this.state.scalars_id;
    picture.arrays_id = this.state.arrays_id;
    this.evaluate(this.state);
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
    var max = this.state.arrays.reduce((memo, item) => {
      return Math.max(memo, getArr(item.evaluated).length);
    }, 0);
    var indices = _.range(1, max + 1);

    var tags = [];
    _.each(this.state.scalars, (item) => {
      tags.push(<Tag item={item}/>);
    });
    tags.push(<CreateTag onClick={this.createScalar}>+</CreateTag>);
    tags.push(<CreateTag>column</CreateTag>);
    _.each(this.state.arrays, (item) => {
      tags.push(<Tag item={item}>{this.getArrayStats(item)}</Tag>);
    });
    tags.push(<CreateTag onClick={this.createArray}>+</CreateTag>);

    var scalarValues = _.map(this.state.scalars, (item) => {
      return <ScalarVal picID={this.props.pictureID} item={item}/>
    });
    var arrayValues = _.map(this.state.arrays, (item) => {
      return <ArrayVal picID={this.props.pictureID} item={item}/>;
    });

    var DEBUG = false;

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
        {DEBUG&&(<div>
        <div className="header">Results</div>
        <div className="container --data">
          <pre>{JSON.stringify(this.state, 2, 2)}</pre>
        </div>
        </div>)}
      </div>
    );
  },

  getArrayStats(item) {
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

});

module.exports = Data;
