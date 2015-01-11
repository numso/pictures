var React = window.React = require('react/addons');
var {component, handler} = require('omniscient-tools');

var PictureStore = require('./pictures/store');
var StepsStore = require('./steps/store');
var CheatSheetStore = require('./cheat-sheet/store');
var store = require('./stores/pictures');

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
  return <App foo={Math.random()}/>;
});

var App = component(function () {
  return (
    <div>
      <Pictures
        pictures={PictureStore.state.cursor('pictures')}
        selectedPicture={PictureStore.state.cursor('selectedPicture')}
      />

      <div style={{ width: 400, display: 'inline-block', verticalAlign: 'top' }}>
        <Data
          selectedPicture={PictureStore.state.cursor('selectedPicture')}
        />
        <Steps
          steps={StepsStore.state.cursor('steps')}
          selected={StepsStore.state.cursor('selected')}
        />
        <Measurements/>
      </div>

      <div style={{ display: 'inline-block', paddingTop: 20 }}>
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <BigPicture
            mode={CheatSheetStore.state.cursor('mode')}
            steps={StepsStore.state.cursor('steps')}
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

// when do we call load, should it exist?
function render(a, b) {
  React.render(<Index/>, document.body);
}

PictureStore.state.on('swap', render);
StepsStore.state.on('swap', render);
CheatSheetStore.state.on('swap', render);

render();
