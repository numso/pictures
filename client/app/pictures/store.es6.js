var immutable = require('immutable');
var immstruct = require('immstruct');
var evaluator = require('../data/evaluator');

exports.newPicture = function () {
  return {
    title: {
      current: 'untitled'
    },
    steps: [],
    selectedStep: {
      current: 0
    },
    bigPictureStuff: { msg: '', previews: {} },
    data: {
      scalars: [{ label: 'parameter', value: '1' }],
      arrays: [{ label: 'item', value: '[1,2,3,4,5]' }],
      scalars_id: 1,
      arrays_id: 1
    }
  };
};

var state = exports.state = immstruct({

  pictures: [
    solarExample(),
    exports.newPicture()
  ],

  selectedPicture: {
    current: 0
  }

});

function solarExample() {
  return {
    title: {
      current: 'Solar Data'
    },
    steps: [ 53, 86, 134, 155, 159, 155, 130, 143, 126, 112, 81, 65 ].map((month, i) => ({ type: 'rect', x1: i * (720 / 12) + 4, x2: (i + 1) * (720 / 12) - 4, y1: 900 - month / 159 * 900, y2: 900 })),
    selectedStep: {
      current: 11
    },
    bigPictureStuff: { msg: '', previews: {} },
    data: {
      scalars: [
        { label: 'panels', value: '600', },
        { label: 'kW / panel', value: '0.2', },
        { label: 'power in kW', value: 's_1 * s_2', }
      ],
      arrays: [
        { label: 'sun hours', value: '[ 53, 86, 134, 155, 159, 155, 130, 143, 126, 112, 81, 65 ]', },
        { label: 'energy in kWh', value: 's_3 * a_1', },
        { label: 'energy in MWh', value: 'a_2 / 1000' }
      ],
      scalars_id: 1,
      arrays_id: 1
    }
  };
}

// --- Evaluation --------------------------------------------------------------

var updatePicture = exports.updatePicture = (index) => {
  giveIDs(state.cursor(['pictures', index, 'data']));
  evaluate(state.cursor(['pictures', index, 'data']));
};

function giveIDs(dataCursor) {
  var scalars_id = dataCursor.get('scalars_id');
  var len = dataCursor.get('scalars').size;
  for (var i = 0; i < len; i++) {
    var item = dataCursor.get('scalars').get(i);
    if (!item.get('id')) {
      item.update('id', () => ('s_' + scalars_id++));
    }
  }
  dataCursor.update('scalars_id', () => scalars_id);

  var arrays_id = dataCursor.get('arrays_id');
  for (var i = 0; i < dataCursor.get('arrays').size; i++) {
    var item = dataCursor.get('arrays').get(i);
    if (!item.get('id')) {
      item.update('id', () => ('a_' + arrays_id++));
    }
  }
  dataCursor.update('arrays_id', () => arrays_id);
}

function evaluate(dataCursor) {
  var ctx = {};
  for (var i = 0; i < dataCursor.get('scalars').size; i++) {
    var item = dataCursor.get('scalars').get(i);
    ctx[item.get('id')] = item.get('value');
  }
  for (var i = 0; i < dataCursor.get('arrays').size; i++) {
    var item = dataCursor.get('arrays').get(i);
    ctx[item.get('id')] = item.get('value');
  }
  var data = evaluator.check(ctx);
  for (var i = 0; i < dataCursor.get('scalars').size; i++) {
    var item = dataCursor.get('scalars').get(i);
    var id = item.get('id');
    item.update('evaluated', () => data[id]);
  }
  for (var i = 0; i < dataCursor.get('arrays').size; i++) {
    var item = dataCursor.get('arrays').get(i);
    var id = item.get('id');
    item.update('evaluated', () => data[id]);
  }
}

// run this function: 1) on page load, 2) on picture create, 3) on every update to picture
updatePicture(0);
updatePicture(1);
