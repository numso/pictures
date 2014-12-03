var React = require('react');
var _ = require('lodash');

var Scalar = require('./scalar');
var Arrayy = require('./arrayy');

// For Flexbox version

var Tag = require('./tag');
var CreateTag = require('./create-tag');
var ScalarVal = require('./scalar-val');
var ArrayVal = require('./array-val');

// End Flexbox

var store = require('../pictures-store');

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
    var state = {
      scalars: [],
      arrays: [],
      scalars_id: 1,
      arrays_id: 1
    };
    return state;
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
    this.createNew('scalars');
  },

  createArray() {
    this.createNew('arrays');
  },

  createNew(type) {
    this.state[type].push({ label: 'item', value: 0 });
    giveIDs(this.state);
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

    // --- START FLEXBOX STUFF -------------------------------------------------

    var tags = [];
    _.each(this.state.scalars, (item) => {
      tags.push(<Tag item={item}/>);
    });
    tags.push(<CreateTag onClick={this.createScalar}>+</CreateTag>);
    tags.push(<CreateTag>column</CreateTag>);
    _.each(this.state.arrays, (item) => {
      tags.push(<Tag item={item}/>);
    });
    tags.push(<CreateTag onClick={this.createArray}>+</CreateTag>);

    var scalarValues = _.map(this.state.scalars, (item) => {
      return <ScalarVal item={item}/>
    });
    var arrayValues = _.map(this.state.arrays, (item) => {
      return <ArrayVal item={item}/>;
    });

    // --- END FLEXBOX STUFF -------------------------------------------------

    var DEBUG = false;

    return (
      <div className="data">
        {DEBUG&&[<div>
        <div className="header">Data (table)</div>
        <div className="container --data">
          <table>
            <tbody>
              {s}
              <tr><td><span onClick={this.createNew.bind(this, 'scalars')} className="tag --create">+</span></td></tr>
              <tr><td></td><td><div>{indices.map((i) => { return <div className="data__indice --header">{i}</div>; })}</div></td></tr>
              {a}
              <tr><td><span onClick={this.createNew.bind(this, 'arrays')} className="tag --create">+</span></td></tr>
            </tbody>
          </table>
        </div>
        </div>]}
        <div className="header">Data (flexbox)</div>
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
        {DEBUG&&[<div>
        <div className="header">Results</div>
        <div className="container --data">
          <pre>{JSON.stringify(this.state, 2, 2)}</pre>
        </div>
        </div>]}
      </div>
    );
  }

});

module.exports = Data;
