var {component} = require('omniscient-tools');

module.exports = component('Measurements', function () {

  return (
    <div>
      <div className="header">Measurements</div>
      <div className="container --data">measurements go here</div>
    </div>
  );

});
