var immutable = require('immutable');
var immstruct = require('immstruct');

exports.newPicture = function () {
  return {
    title: 'untitled',
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
    title: 'Solar Data',
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
