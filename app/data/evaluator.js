/*
 * This is a list of transformer functions. They take in an object of strings
 * and deduce what they evaluate to. Each one is a step up from the last.
 */

import _ from 'lodash'

// maybe use something like this to stop people from messing up?
const PREAMBLE = 'var window={}; var document={}; var alert = function() {};'
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
function simple (ctx, data) {
  _.forEach(ctx, (val, key) => {
    try {
      if (/\{[as]:.*?\}/.test(val)) throw new Error()
      const result = window.dangerEval(PREAMBLE, val, data)
      if (key.startsWith('{a') && !_.isArray(result)) {
        // ahhh, didn't work
      } else if (!isNaN(result)) {
        data[key] = result
      }
    } catch (error) {}
  })
  return data
}

// Evaluates expressions, but tries to inject known values into them
function injected (ctx, data, max) {
  _.forEach(ctx, (val, key) => {
    try {
      val = val.replace(/\{[as]:[a-zA-Z0-9_-]*?(:[^\d]+)?\}/g, 'data["$&"]')
      val = val.replace(/(\{[as]:[a-zA-Z0-9_-]*):(\d+)\}/g, 'data["$1}"][$2]')
      let result = window.dangerEval(PREAMBLE, val, data)
      if (key.startsWith('{a') && !_.isArray(result)) {
        result = evaluateArray(data, val, max)
        if (_.isArray(result)) data[key] = result
      } else if (!isNaN(result)) {
        data[key] = result
      }
    } catch (error) {
      if (error.message.includes('with statement')) throw error
    }
  })
  return data
}

function evaluateArray (data, expr, max) {
  const arr = []
  for (let i = 0; i < max; i++) {
    const newExpr = expr.replace(/({a:[a-zA-Z0-9_-]*?}"])/g, '$1[' + i + ']')
    // TODO;; what if max is higher than mah thing...
    arr[i] = window.dangerEval(PREAMBLE, newExpr, data)
    if (isNaN(arr[i])) return null
  }
  return !max ? null : arr
}

function getArrayMax (data) {
  return _.reduce(
    data,
    (memo, item) => (_.isArray(item) ? Math.max(memo, item.length) : memo),
    0
  )
}

const round = num => Math.round(num * 10) / 10

// strip out the already evaluated expresions from the "to-evaluate" object
function strip (obj1, obj2) {
  const keys = _.keys(obj1)
  _.forEach(keys, key => {
    if (key in obj2) {
      delete obj1[key]
      if (key.startsWith('{a')) addTransforms(obj2, key)
    }
  })
  return obj1
}

function addTransforms (obj, key) {
  const key2 = key.replace('}', '')
  obj[`${key2}:min}`] = Math.min.apply(null, obj[key])
  obj[`${key2}:sum}`] = obj[key].reduce((memo, num) => memo + num, 0)
  obj[`${key2}:avg}`] = obj[`${key2}:sum}`] / obj[key].length
  obj[`${key2}:max}`] = Math.max.apply(null, obj[key])
  obj[`${key2}:len}`] = obj[key].length
}

// NOTE:: We expect expressions to be strings. If it is a number or an array it is assumed to be pre-evaluated.
export default function evaluate (ctx) {
  let data = {}
  for (const key in ctx) {
    if (!_.isString(ctx[key])) data[key] = ctx[key]
  }
  ctx = strip(ctx, data)

  data = simple(ctx, data)
  ctx = strip(ctx, data)

  let working = true
  while (working) {
    const max = getArrayMax(data)
    data = injected(ctx, data, max)
    const len1 = _.keys(ctx).length
    ctx = strip(ctx, data)
    const len2 = _.keys(ctx).length
    working = len1 !== len2
  }

  _.forEach(data, (item, key) => {
    if (_.isNumber(item)) {
      data[key] = round(item)
    } else if (_.isArray(item)) {
      _.forEach(item, (item2, i) => {
        if (_.isNumber(item2)) {
          item[i] = round(item2)
        }
      })
    }
  })

  return data
}
