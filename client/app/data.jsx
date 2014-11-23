var React = require('react');
var _ = require('lodash');

var evaluator = require('./evaluator');

var Data = React.createClass({

  getInitialState() {
    var scalars = [
      { label: 'parameter', value: '1' },
      { label: 'foo', value: '7 + 8' },
      { label: 'bar', value: '20 / 4' },
      { label: 'baz', value: 'foo + bar' }
    ];
    this.evaluateScalars(scalars);
    return {
      scalars: scalars,
      arrays: [
        { label: 'item', value: [1, 2, 3, 4, 5] },
      ]
    };
  },

  evaluateScalars(scalars=this.state.scalars) {
    var ctx = {};
    _.each(scalars, function (item) {
      ctx[item.label] = item.value;
    });
    var data = evaluator.check(ctx);
    _.each(scalars, function (item) {
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

    if (type === 'scalars') {
      this.evaluateScalars();
    }
    this.setState({ [type]: this.state[type] });
  },

  render() {
    var s = this.state.scalars.map((item, i) => {
      return <Scalar item={item}
                     onTitleChange={this.onTitleChange.bind(this, i, 'scalars')}
                     onValueChange={this.onValueChange.bind(this, i, 'scalars')}/>
    });

    var a = this.state.arrays.map((item, i) => {
      return <Scalar item={item}
                     onTitleChange={this.onTitleChange.bind(this, i, 'arrays')}
                     onValueChange={this.onValueChange.bind(this, i, 'arrays')}/>
    });

    var max = this.state.arrays.reduce((memo, item) => {
      return Math.max(memo, item.value.length);
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


          <div style={{marginLeft: 60}}>{indices.map(function (i) { return <div className="data__indice">{i}</div>; })}</div>
          <div id="arrays">
            {a}
            <span onClick={this.createNew.bind(this, 'arrays')} className="tag --create">+</span>
          </div>
        </div>
        <div className="header">Results</div>
        <div className="container --data">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }

});

module.exports = Data;





var Scalar = React.createClass({

  getInitialState: function() {
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
    this.props.onTitleChange(e.target.value);
  },

  onValueChange(e) {
    this.props.onValueChange(e.target.value);
  },

  render() {
    var showVal = this.state.isHovered || this.state.isActive;
    var classes = "scalar" + (this.state.isActive ? ' active': '');
    return (
      <div className={classes} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onFocus={this.onFocus} onBlur={this.onBlur}>
        <ContentEditable onChange={this.onTitleChange} html={this.props.item.label}/>
        <ContentEditable2 onChange={this.onValueChange} text={showVal ? this.props.item.value : this.props.item.evaluated}/>
      </div>
    );
  }

});





var ContentEditable2 = React.createClass({

  render() {
    return <span
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.text}}></span>;
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.getDOMNode().innerText;
  },

  emitChange() {
    var text = this.getDOMNode().innerText || '';
    text = text.trim();
    if (this.props.onChange && text !== this.lastText) {
      this.props.onChange({ target: { value: text } });
    }
    this.lastText = text;
  }
});

var ContentEditable = React.createClass({

  render() {
    return <span className="tag"
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}></span>;
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  emitChange() {
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({ target: { value: html } });
    }
    this.lastHtml = html;
  }
});
