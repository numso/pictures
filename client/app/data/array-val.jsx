var React = require('react');
var ContentEditable = require('./content-editable');

function getArr(item) {
  if (item && _.isArray(item)) return item;
  return [];
}

var ArrayVal = React.createClass({

  render() {
    return (
      <div>
        {getArr(this.props.item.evaluated).map((item) => {
          return <div className="data__indice">{item}</div>
        })}
      </div>
    );
  }

});

module.exports = ArrayVal;
