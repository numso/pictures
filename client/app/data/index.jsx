var React = require('react');
var _ = require('lodash');

var Scalar = require('./scalar');
var Arrayy = require('./arrayy');
var ContentEditable = require('./content-editable');

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
    _.each(this.state.scalars, (item, i) => {
      tags.push(<div><ContentEditable draggable="true" text={item.label} className="tag"/></div>);
    });
    tags.push(<div><span onClick={this.createNew.bind(this, 'scalars')} className="tag --create">+</span></div>);
    tags.push(<div><span className="tag --create">column</span></div>);
    _.each(this.state.arrays, (item, i) => {
      tags.push(<div><ContentEditable draggable="true" text={item.label} className="tag"/></div>);
    });
    tags.push(<span onClick={this.createNew.bind(this, 'arrays')} className="tag --create">+</span>);

    var scalarValues = _.map(this.state.scalars, (item) => {
      return <div style={{minHeight: 22}}><ContentEditable text={item.evaluated}/></div>;
    });
    var arrayValues = _.map(this.state.arrays, (item) => {
      return <div>
            {getArr(item.evaluated).map((item) => {
              return <div className="data__indice">{item}</div>
            })}
          </div>;
    });

    // --- END FLEXBOX STUFF -------------------------------------------------

    return (
      <div className="data">
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
        <div className="header">Results</div>
        <div className="container --data">
          <pre>{JSON.stringify(this.state, 2, 2)}</pre>
        </div>
      </div>
    );
  }

});

module.exports = Data;
