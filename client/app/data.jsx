var React = require('react');

var Data = React.createClass({

  getInitialState() {
    return {
      scalars: [
        { label: 'Panels',     value: 600 },
        { label: 'KW / Panel', value: 0.2 }
      ],
      arrays: []
    };
  },

  createNew() {
    this.state.scalars.push({});
    this.setState({ scalars: this.state.scalars });
  },

  onTitleChange(i, newText) {
    this.state.scalars[i].label = newText;
    this.setState({ scalars: this.state.scalars });
  },


  onValueChange(i, newText) {
    this.state.scalars[i].value = newText;
    this.setState({ scalars: this.state.scalars });
  },

  render() {
    var s = this.state.scalars.map((item, i) => {
      return <Scalar label={item.label}
                     value={item.value}
                     onTitleChange={this.onTitleChange.bind(this, i)}
                     onValueChange={this.onValueChange.bind(this, i)}/>
    });

    return (
      <div>
        <div className="header">Data</div>
        <div className="container">
          <div id="scalars">
            {s}
            <span onClick={this.createNew} className="tag --create">+</span>
          </div>

          <div id="arrays"></div>
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
