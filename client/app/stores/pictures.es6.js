var watchers = [];

var cur = 0;

var store = [

  {
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
    arrays_id: 1,
    title: 'Solar Data'
  }

];

module.exports = {

  getLength() {
    return store.length;
  },

  getData(i) {
    return store[i];
  },

  setData(i, updated) {
    store[i] = updated;
    notify();
  },

  addItem() {
    store.push(newItem());
    cur = store.length - 1;
    notify();
  },

  watch(cb) {
    watchers.push(cb);
  },

  getCur() {
    return cur;
  },

  setCur(i) {
    cur = i;
    notify();
  }

};


function notify() {
  watchers.forEach((cb) => {
    cb();
  });
}

function newItem() {
  return {
    scalars: [{ label: 'parameter', value: '1' }],
    arrays: [{ label: 'item', value: '[1,2,3,4,5]' }],
    scalars_id: 1,
    arrays_id: 1,
    title: 'untitled'
  };
}

store.push(newItem());
