var React = require('react');

var ContentEditable = React.createClass({

  getDefaultProps() {
    return {
      onChange: function () {},
      onFinish: function () {}
    };
  },

  componentDidMount() {
    setTimeout(() => {
      selectElementContents(this.getDOMNode());
    });
  },

  shouldComponentUpdate() {
    return false;
  },

  onInput() {
    var text = (this.getDOMNode().innerText || '').trim();
    this.props.onChange(text);
  },

  onKeyDown(e) {
    if (e.keyCode === 13) {
      var text = (this.getDOMNode().innerText || '').trim();
      this.props.onFinish(text);
    }
  },

  render() {
    return <span style={{ backgroundColor: 'white', minWidth: 50, display: 'inline-block' }}
                 onInput={this.onInput}
                 onKeyDown={this.onKeyDown}
                 contentEditable={true}
                 dangerouslySetInnerHTML={{ __html: this.props.text }}></span>;
  }

});

module.exports = ContentEditable;



function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
