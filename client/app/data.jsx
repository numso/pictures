var React = require('react');
var _ = require('lodash');

var Data = React.createClass({

  getInitialState() {
    return {
      scalars: [
        { label: 'parameter', value: 1 }
      ],
      arrays: [
        { label: 'item', value: [1, 2, 3, 4, 5] },
      ]
    };
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
    this.setState({ [type]: this.state[type] });
  },

  render() {
    var s = this.state.scalars.map((item, i) => {
      return <Scalar label={item.label}
                     value={item.value}
                     onTitleChange={this.onTitleChange.bind(this, i, 'scalars')}
                     onValueChange={this.onValueChange.bind(this, i, 'scalars')}/>
    });

    var a = this.state.arrays.map((item, i) => {
      return <Scalar label={item.label}
                     value={item.value}
                     onTitleChange={this.onTitleChange.bind(this, i, 'arrays')}
                     onValueChange={this.onValueChange.bind(this, i, 'arrays')}/>
    });

    var max = this.state.arrays.reduce((memo, item) => {
      return Math.max(memo, item.value.length);
    }, 0);
    var indices = _.range(1, max + 1);

    return (
      <div className="data">
        <div className="header">Data - test</div>
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
      </div>
    );
        // <pre>{JSON.stringify(this.state, null, 2)}</pre>
  }

});

module.exports = Data;





var Scalar = React.createClass({

  getDefaultProps() {
    return {
      label: '',
      value: null
    };
  },

  onTitleChange(e) {
    this.props.onTitleChange(e.target.value);
  },

  onValueChange(e) {
    this.props.onValueChange(e.target.value);
  },

  render() {
    return (
      <div>
        <ContentEditable onChange={this.onTitleChange} html={this.props.label}/>
        <ContentEditable2 onChange={this.onValueChange} html={this.props.value}/>
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
