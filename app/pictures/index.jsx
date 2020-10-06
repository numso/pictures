var {component} = require('omniscient-tools');
var Picture = require('./picture');
var PicturesStore = require('./store');
var immutable = require('immutable');

module.exports = component('Pictures', function ({selectedPicture, pictures}) {

  function addNew() {
    pictures.update((oldPictures) => {
      return oldPictures.push(immutable.fromJS(PicturesStore.newPicture()));
    });
  }

  return (
    <div>
      <div className="header">Pictures</div>
      <div className="container --pictures">
        {pictures.map((picture, i) => {
          return <Picture
            index={i}
            picture={pictures.get(i)}
            selectedPicture={selectedPicture}
          />
        }).toJS()}
        <div className="newpicture" onClick={addNew}>
          <span className="newpicture__content">+</span>
        </div>
      </div>
    </div>
  );

});
