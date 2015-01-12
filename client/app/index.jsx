var React = window.React = require('react/addons');
var {component, handler} = require('omniscient-tools');

var PictureStore = require('./pictures/store');
var CheatSheetStore = require('./cheat-sheet/store');

var Pictures = require('./pictures');
var Data = require('./data');
var Steps = require('./steps');
var BigPicture = require('./big-picture');
var Measurements = require('./measurements');
var CheatSheet = require('./cheat-sheet');

function load() {
  // optionally load all stores from a backend or localstorage or firebase or something.
}

var Index = handler(load, function () {
  // When refactor is done (and you've chosen a better name than 'bigPictureStuff')
  // all the cursors should be passed into the app here instead of a random num.
  return <App foo={Math.random()}/>;
});

var App = component(function () {
  var curPicture = PictureStore.state.cursor('selectedPicture').get('current');
  var curPictureCursor = PictureStore.state.cursor('pictures').get(curPicture);
  var dataCursor = curPictureCursor.get('data');
  var stepsCursor = curPictureCursor.get('steps');
  var curStepSelectedCursor = curPictureCursor.get('selectedStep');
  var bigPictureStuff = curPictureCursor.get('bigPictureStuff');
  return (
    <div>
      <Pictures
        pictures={PictureStore.state.cursor('pictures')}
        selectedPicture={PictureStore.state.cursor('selectedPicture')}
      />

      <div style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}>
        <Data
          selectedPicture={PictureStore.state.cursor('selectedPicture')}
          pictureData={dataCursor}
        />
        <Steps
          steps={stepsCursor}
          selected={curStepSelectedCursor}
        />
        <Measurements/>
      </div>

      <div style={{ display: 'inline-block', paddingTop: 20 }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <BigPicture
            mode={CheatSheetStore.state.cursor('mode')}
            steps={stepsCursor}
            bigPictureStuff={bigPictureStuff}
            selectedStep={curStepSelectedCursor}
          />
        </div>

        <div style={{ display: 'inline-block', position: 'absolute', right: 0 }}>
          <CheatSheet
            labels={CheatSheetStore.state.cursor('labels')}
            mode={CheatSheetStore.state.cursor('mode')}
          />
        </div>
      </div>
    </div>
  );

});

function render(a, b) {
  React.render(<Index/>, document.body);
}

PictureStore.state.on('swap', render);
CheatSheetStore.state.on('swap', render);

render();

// just a quick test for removing steps
// should be moved somewhere else....
// also, keypress's should be paused while editing stuff
document.addEventListener('keypress', (e) => {
  if (e.keyCode === 39) { // ' (apostrophe)
    var curPicture = PictureStore.state.cursor('selectedPicture').get('current');
    var curPictureCursor = PictureStore.state.cursor('pictures').get(curPicture);
    var stepsCursor = curPictureCursor.get('steps');
    var selectedStep = curPictureCursor.get('selectedStep').get('current');
    stepsCursor = stepsCursor.remove(selectedStep);
    if (selectedStep >= stepsCursor.size) {
      curPictureCursor.get('selectedStep').update('current', () => stepsCursor.size - 1);
    }
  }
});
