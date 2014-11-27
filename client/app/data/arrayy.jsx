var React = require('react');

var ContentEditable = require('./content-editable');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

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

  showStuff() {
    this.setState({
      showBox: !this.state.showBox
    });
  },

  dragStart(text) {
    var key = this.props.item.id;
    if (text) {
      key += '_' + text;
      key = key.replace('a', 'ar');
    }
    event.dataTransfer.setData('text/plain', key);
  },

  render() {
    var showVal = this.state.isHovered || this.state.isActive;
    var classes = "scalar" + (this.state.isActive ? ' active': '');

    var stats = [
      { name: 'min', code: function (arr) { return Math.min.apply(this, arr); } },
      { name: 'avg', code: function (arr) { return arr.reduce(function (memo, num) { return memo + num}, 0) / arr.length; } },
      { name: 'max', code: function (arr) { return Math.max.apply(this, arr); } },
      { name: 'sum of', code: function (arr) { return arr.reduce(function (memo, num) { return memo + num}, 0); } },
      { name: '# of', code: function (arr) { return arr.length; } }
    ];
    return (
      <div className={classes} onMouseEnter={this.onMouseEnter} onDragEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseUp={this.onFocus} onBlur={this.onBlur}>
        <ContentEditable draggable="true" onDragStart={this.dragStart.bind(this, '')} onChange={this.onTitleChange} isEditting={this.state.isActive} text={this.props.item.label} className="tag"/>
        <span className='tag__arrow' onClick={this.showStuff}/>

        {this.state.showBox &&
        <div className="test-box">
          {stats.map((stat) => {
            return (
              <div>
                <div className="tag" draggable="true" onDragStart={this.dragStart.bind(this, stat.name)}>{stat.name} {this.props.item.label}</div>
                <span>{evaluator.round(stat.code(this.props.item.evaluated))}</span>
              </div>
            );
          })}
        </div>
        }

        {showVal ?
          <ContentEditable onChange={this.onValueChange} isEditting={this.state.isActive} text={this.props.item.value}/> :
          <span className="foobar" >
            {getArr(this.props.item.evaluated).map((item) => {
              return <div className="data__indice">{item}</div>
            })}
          </span>
        }
      </div>
    );
  }

});

module.exports = Arrayy;
