var React = require('react');

var ContentEditable = React.createClass({

  shouldComponentUpdate(nextProps) {
    return !(nextProps.isEditting && this.props.isEditting);
  },

  emitChange() {
    if (!this.props.isEditting) return false;
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
                 draggable={this.props.draggable}
                 onDragStart={this.props.onDragStart}
                 contentEditable={this.props.isEditting}
                 dangerouslySetInnerHTML={{__html: this.props.text}}></span>;
  }

});

module.exports = ContentEditable;
