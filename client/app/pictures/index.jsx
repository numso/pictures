var {component} = require('omniscient-tools');
var Picture = require('./picture');
var PicturesStore = require('./store');
var immutable = require('immutable');

module.exports = component(function ({selectedPicture, pictures}) {

  function addNew() {
    pictures.update((oldPictures) => {
      return oldPictures.push(immutable.fromJS(PicturesStore.newPicture()));
    });
  }

  function setPicture(i) {
    return function () {
      selectedPicture.update('current', () => i);
    };
  }

  function renderPictures() {
    var markup = [];
    for (var i = 0; i < pictures.size; i++) {
      markup.push(<Picture num={i} selected={selectedPicture.get('current') === i} onClick={setPicture(i)}/>);
    }
    return markup;
  }

  return (
    <div>
      <div className="header">Pictures</div>
      <div className="container --pictures">
        {renderPictures()}
        <div className="newpicture" onClick={addNew}>
          <span className="newpicture__content">+</span>
        </div>
      </div>
    </div>
  );

});
