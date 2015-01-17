var {component} = require('omniscient-tools');

module.exports = component('CreateTag', function ({onClick}) {

  return (
    <div>
      <span onClick={this.props.onClick} className="tag --create">{this.props.children}</span>
    </div>
  );

});
