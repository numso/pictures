var listeners = [];

exports.data = [];

exports.add = (step) => {
  exports.data.push(step);
  notify(step);
};

exports.listen = (cb) => {
  listeners.push(cb);
};

function notify(data) {
  listeners.forEach((cb) => {
    cb(data);
  });
}
