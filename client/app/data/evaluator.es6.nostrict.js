/*
 * This is a list of transformer functions. They take in an object of strings
 * and deduce what they evaluate to. Each one is a step up from the last.
 */

var _ = require('lodash');

// maybe use something like this to stop people from messing up?
var PREAMBLE = "var window={}; var document={}; var alert = function() {};";
// still need to protect users from: this
// update: meh, giving up. let the user mess up if they want. I'll shove this code in a webworker later

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
      var result = eval(PREAMBLE + val);
      if (key[0] === 'a' && !_.isArray(result)) {
        // ahhh, didn't work
      } else {
        data[key] = result;
      }
    } catch (e) {}
  });
  return data;
};


// Evaluates expressions, but tries to inject known values into them
exports.injected = function (ctx, data, max) {
  _.each(ctx, function (val, key) {
    try {
      var result = eval(PREAMBLE + 'with(data){' + val + '}');
      if (key[0] === 'a' && !_.isArray(result)) {
        result = evaluateArray(data, val, max);
        if (_.isArray(result)) data[key] = result;
      } else {
        data[key] = result;
      }
    } catch (e) {}
  });
  return data;
};






function evaluateArray(data, expr, max) {
  expr = '' + expr;
  var arr = [];
  for (var i = 0; i < max; i++) {
    var newExpr = expr.replace(/(a_\d*)/g, '$&[' + i + ']');
    arr[i] = eval(PREAMBLE + 'with(data){' + newExpr + '}');
  }
  return arr;
}

function getArrayMax(data) {
  return _.reduce(data, function (memo, item, key) {
    if (key[0] !== 'a') return memo;
    if (key[1] !== '_') return memo;
    return Math.max(memo, item.length);
  }, 0);
}

exports.round = function (item) {
  return Math.round(item * 1000) / 1000;
};







// strip out the already evaluated expresions from the "to-evaluate" object
exports.strip = function (obj1, obj2) {
  var keys = _.keys(obj1);
  _.each(keys, function (key) {
    if (key in obj2) {
      delete obj1[key];
      if (key[0] === 'a' && key[1] === '_') addTransforms(obj2, key);
    }
  });
  return obj1;
}

function addTransforms(obj, key) {
  var key2 = key.replace('a', 'ar');
  obj[key2 + '_min'] = Math.min.apply(this, obj[key]);
  obj[key2 + '_avg'] = obj[key].reduce(function (memo, num) { return memo + num}, 0) / obj[key].length;
  obj[key2 + '_max'] = Math.max.apply(this, obj[key]);
  obj[key2 + '_sum'] = obj[key].reduce(function (memo, num) { return memo + num}, 0);
  obj[key2 + '_len'] = obj[key].length;
}


exports.check = function (ctx) {
  var data = exports.simple(ctx, {});
  ctx = exports.strip(ctx, data);
  var max = getArrayMax(data);

  var working = true;
  while (working) {
    data = exports.injected(ctx, data, max);
    var len1 = _.keys(ctx).length;
    ctx = exports.strip(ctx, data);
    var len2 = _.keys(ctx).length;
    working = len1 !== len2;
  }

  _.each(data, (item, key) => {
    if (_.isNumber(item)) {
      data[key] = exports.round(item);
    } else if (_.isArray(item)) {
      _.each(item, (item2, i) => {
        if (_.isNumber(item2)) {
          item[i] = exports.round(item2);
        }
      });
    }
  });

  return data;
};
