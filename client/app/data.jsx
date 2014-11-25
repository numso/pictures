var React = require('react');
var _ = require('lodash');

var evaluator = require('./evaluator');

var Data = React.createClass({

  getInitialState() {
    // var state = {
    //   scalars: [{ label: 'parameter', value: '1' }],
    //   arrays: [{ label: 'item', value: '[1,2,3,4,5]' }]
    // };
    var state = {
      scalars: [
        { label: 'parameter', value: '1' },
        { label: 'foo', value: '7 + 8' },
        { label: 'bar', value: '20 / 4' },
        { label: 'baz', value: 'foo + bar' }
      ],
      arrays: [
        { label: 'item', value: JSON.stringify([1, 2, 3, 4, 5]) },
        { label: 'test', value: 'item.map(function (a){ return a * 2; });' },
      ]
    };
    this.evaluateScalars(state.scalars);
    this.evaluateArrays(state.arrays);
    return state;
  },

  evaluateScalars(scalars=this.state.scalars) {
    var ctx = {};
    _.each(scalars, (item) => {
      ctx[item.label] = item.value;
    });
    var data = evaluator.check(ctx);
    _.each(scalars, (item) => {
      item.evaluated = data[item.label];
    });
  },

  evaluateArrays(arrays=this.state.arrays) {
    var ctx = {};
    _.each(arrays, (item) => {
      ctx[item.label] = item.value;
    });
    var data = evaluator.check(ctx);
    _.each(arrays, (item) => {
      item.evaluated = data[item.label];
    });
  },

  createNew(type) {
    var value = type === 'arrays' ? { value: [] } : {};
    this.state[type].push(value);
    this.setState({ [type]: this.state[type] });
  },

  onTitleChange(i, type, newText) {
    this.state[type][i].label = newText;
    this.setState({ [type]: this.state[type] });
  },

  onValueChange(i, type, newText) {
    this.state[type][i].value = newText;

    if (type === 'scalars') this.evaluateScalars();
    else this.evaluateArrays();

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
      return Math.max(memo, (item.evaluated || []).length);
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


          <div style={{marginLeft: 60}}>{indices.map((i) => { return <div className="data__indice --header">{i}</div>; })}</div>
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





var Arrayy = React.createClass({

  getInitialState() {
    return {
      isHovered: false,
      isActive: false
    };
  },

  getDefaultProps() {
    return {
      item: { label: '' }
    };
  },

  onMouseEnter() {
    this.setState({ isHovered: true });
  },

  onMouseLeave() {
    this.setState({ isHovered: false });
  },

  onFocus() {
    this.setState({ isActive: true });
  },

  onBlur() {
    this.setState({ isActive: false });
  },

  onTitleChange(e) {
    this.props.onTitleChange(e);
  },

  onValueChange(e) {
    this.props.onValueChange(e);
  },

  render() {
    var showVal = this.state.isHovered || this.state.isActive;
    var classes = "scalar" + (this.state.isActive ? ' active': '');
    return (
      <div className={classes} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onFocus={this.onFocus} onBlur={this.onBlur}>
        <ContentEditable onChange={this.onTitleChange} isEditting={this.state.isActive} text={this.props.item.label} className="tag"/>
        {showVal ?
          <ContentEditable onChange={this.onValueChange} isEditting={this.state.isActive} text={this.props.item.value}/> :
          <span>
            {(this.props.item.evaluated || []).map((item) => {
              return <div className="data__indice">{item}</div>
            })}
          </span>
        }
      </div>
    );
  }

});




var Scalar = React.createClass({

  getInitialState() {
    return {
      isHovered: false,
      isActive: false
    };
  },

  getDefaultProps() {
    return {
      item: { label: '' }
    };
  },

  onMouseEnter() {
    this.setState({ isHovered: true });
  },

  onMouseLeave() {
    this.setState({ isHovered: false });
  },

  onFocus() {
    this.setState({ isActive: true });
  },

  onBlur() {
    this.setState({ isActive: false });
  },

  onTitleChange(e) {
    this.props.onTitleChange(e);
  },

  onValueChange(e) {
    this.props.onValueChange(e);
  },

  render() {
    var showVal = this.state.isHovered || this.state.isActive;
    var classes = "scalar" + (this.state.isActive ? ' active': '');
    return (
      <div className={classes} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onFocus={this.onFocus} onBlur={this.onBlur}>
        <ContentEditable onChange={this.onTitleChange} isEditting={this.state.isActive} text={this.props.item.label} className="tag"/>
        <ContentEditable onChange={this.onValueChange} isEditting={this.state.isActive} text={showVal ? this.props.item.value : this.props.item.evaluated}/>
      </div>
    );
  }

});





var ContentEditable = React.createClass({

  shouldComponentUpdate(nextProps) {
    return !(nextProps.isEditting && this.props.isEditting);
  },

  emitChange() {
    var text = (this.getDOMNode().innerText || '').trim();
    if (this.props.onChange) this.props.onChange(text);
  },

  onKeyDown(e) {
    if (e.keyCode === 13) {
      setTimeout(() => {
        this.getDOMNode().blur();
      });
    }
  },

  render() {
    return <span className={this.props.className}
                 onKeyDown={this.onKeyDown}
                 onInput={this.emitChange}
                 onBlur={this.emitChange}
                 contentEditable
                 dangerouslySetInnerHTML={{__html: this.props.text}}></span>;
  }

});
