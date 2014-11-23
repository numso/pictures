/*
 * This is a list of transformer functions. They take in an object of strings
 * and deduce what they evaluate to. Each one is a step up from the last.
 */

var _ = require('lodash');

/*
 * Evaluator.simple
 * Just evaluates Javascript. Doesn't inject anything. The `errors` flag
 * determines what to do when it fails.
 *
 * Takes in an object like this:
 *
 * {
 *   param1: '4',
 *   param2: '8 + 7',
 *   param3: '9 * 2',
 *   param4: 'param3 * param2'
 * }
 *
 * And returns one like this:
 *
 * {
 *   param1: 4,
 *   param2: 15,
 *   param3: 18,
 *   param4: undefined
 * }
 *
 */
exports.simple = function (ctx, data) {
  _.each(ctx, function (val, key) {
    try {
      data[key] = eval(val);
    } catch (e) {}
  });
  return data;
};


exports.injected = function (ctx, data) {
  _.each(ctx, function (val, key) {
    try {
      console.log('trying');
      data[key] = eval('with(data){' + val + '}');
      console.log(data[key]);
    } catch (e) {}
  });
  return data;
};

exports.strip = function (obj1, obj2) {
  var keys = _.keys(obj1);
  _.each(keys, function (key) {
    if (key in obj2) delete obj1[key];
  });
  return obj1;
}


exports.check = function (ctx) {
  var data = exports.simple(ctx, {});
  ctx = exports.strip(ctx, data);

  var working = true;
  while (working) {
    data = exports.injected(ctx, data);
    var len1 = _.keys(ctx).length;
    ctx = exports.strip(ctx, data);
    var len2 = _.keys(ctx).length;
    working = len1 !== len2;
  }

  return data;
};
